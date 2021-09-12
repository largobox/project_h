const createStore = (reducer, initialState) => {
  let currentState = initialState;
  const listeners = [];

  const getState = () => currentState;
  const dispatch = action => {
    currentState = reducer(currentState, action);
    listeners.forEach(listener => listener());
  };

  const subscribe = listener => listeners.push(listener);

  return { getState, dispatch, subscribe };
};

const connect = (mapStateToProps, mapDispatchToProps) =>
  Component => {
    class WrappedComponent extends React.Component {
      render() {
        return (
          <Component
            {...this.props}
            {...mapStateToProps(this.context.store.getState(), this.props)}
            {...mapDispatchToProps(this.context.store.dispatch, this.props)}
          />
        );
      }

      componentDidMount() {
        this.context.store.subscribe(this.handleChange);
      }

      handleChange = () => {
        this.forceUpdate();
      }
    }

    WrappedComponent.contextTypes = {
      store: PropTypes.object,
    };

    return WrappedComponent;
  };

class Provider extends React.Component {
  getChildContext() {
    return {
      store: this.props.store,
    };
  }
  
  render() {
    return React.Children.only(this.props.children);
  }
}

Provider.childContextTypes = {
  store: PropTypes.object,
};

// APP

// actions

const CHANGE_INTERVAL = 'CHANGE_INTERVAL';

// action creators

const changeInterval = value => ({
  type: CHANGE_INTERVAL,
  payload: value,
});


// reducers

const reducer = (state, action) => {
  switch(action.type) {
    case CHANGE_INTERVAL:
      return state += action.payload;
    default:
      return {};
  }
};

// components

class IntervalComponent extends React.Component {
  render() {
    return (
      <div>
        <span>Интервал обновления секундомера: {this.props.currentInterval} сек.</span>
        <span>
          <button onClick={this.decreaseInterval}>-</button>
          <button onClick={this.increaseInterval}>+</button>
        </span>
      </div>
    );
  }

  decreaseInterval = () => {
    if (this.props.currentInterval === 1) {
      return;
    }

    this.props.changeInterval(-1);
  }

  increaseInterval = () => {
    this.props.changeInterval(1)
  }
}

const Interval = connect(
  state => ({
    currentInterval: state
  }),
  dispatch => ({
    changeInterval: value => dispatch(changeInterval(value))
  })
)(IntervalComponent);

class TimerComponent extends React.Component {
  state = {
    currentTime: 0,
    intervalId: null
  }

  render() {
    return (
      <div>
        <Interval />
        <div>
          Секундомер: {this.state.currentTime} сек.
        </div>
        <div>
          <button onClick={this.handleStart}>Старт</button>
          <button onClick={this.handleStop}>Стоп</button>
        </div>
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (!this.state.intervalId) {
      return;
    }

    if (prevProps.currentInterval !== this.props.currentInterval) {
      clearInterval(this.state.intervalId);

      const intervalId = setInterval(
        this.tick,
        this.props.currentInterval * 1000
      );

      this.setState({ intervalId });
    }
  }

  handleStart = () => {
    if (this.state.intervalId) {
      return;
    }

    const intervalId = setInterval(
      this.tick,
      this.props.currentInterval * 1000
    );

    this.setState({ intervalId });
  }
  
  handleStop = () => {
    clearInterval(this.state.intervalId);

    this.setState({
      intervalId: null
    });
  }

  tick = () => {
    this.setState({
      currentTime: this.state.currentTime + this.props.currentInterval
    });
  }
}

const Timer = connect(state => ({
  currentInterval: state,
}), () => {})(TimerComponent);

// init
ReactDOM.render(
  <Provider store={createStore(reducer, 1)}>
    <Timer />
  </Provider>,
  document.getElementById('app')
);

/*
  1) Изначально никакое начальное значение интервала не отображается.
  
  Как фиксим: при вызове createStore 2-ым аргументом
  добавим начальное значение стора равное 1

  2) У класса 'TimerComponent', в методах handleStart, handleStop ожидается что this
  будет ссылаться на экзмепляр класса 'TimerComponent'.
  
  Как фиксим: можно определить методы как стрелочные функции

  3) При нажатии на кнопку "Старт" текущее значение времени возрастает лишь раз,
  а секундомер все таки не должен так работать.

  Как фиксим: в функции "handleStart" меняем функцию setTimeout на setInterval.
  Также для дальнейшего удобства выделим функцию,
  которая передаётся теперь уже в setInterval, в отдельный
  метод компонента "TimerComponent". Назовём этот метод "tick"

  4) После действия 3 Получили проблему. Теперь при повторном нажатии
  на кнопку "Старт" запускаются новые периодические вызовы метода "tick"

  Как фиксим:
  - добавляем в состояние компонента "TimerComponent" свойство "intervalId"
  - в методе "handleStart" в начале добавляем проверки на существование "intervalId"
  - в методе "handleStart" в конце добавляем вызов метода "setState" для "intervalId"

  5) Поменяем немного логику метода "handleStop", а то текущее поведение больше похоже
  на сброс таймера, а не на его остановку

  6) Компонент "Interval"  не получает значение стора.

  Как фиксим: в соответствии с сигнатурой функции "connect"
  нужно при опредлении компонента "Interval" поменять аргументы местами

  7) При первом рендере компонент "Interval" не реагирует на клики
  по кнопкам "Уменьшить" и "Увеличить". Это происходит потому что подписка
  на изменения в сторе в компоненте "WrappedComponent" происходит
  не в методе "componentDidMount", а в методе "componentDidUpdate"

  Как фиксим: в компоненте "WrappedComponent" переименовываем
  метод "componentDidUpdate" в "componentDidMount"

  8) При изменении интервала во время того как секундомер уже запущен
  фактический интервал обновления на экране не меняется

  Как фиксим: В компонент "TimerComponent" добавляем метод "componentDidUpdate",
  в котором реагируем на изменение стора

  9) Сейчас интервал можно сделать отрицательным или равным нулю,
  выглядит это неинтуитивно

  Как фиксим: В компонент "Interval" добавяем методы
  "decreaseInterval" и "increaseInterval". Заодно и избавились от анонимных onClick,
  которые потенциально могут вызывать лишние рендеры компонента "button"

  ----------------------------------------------------------------------------------

  Минимум для починки выполнен, дополнитльно можно еще (но я не сделал):
  - раскидать по папка текущую простыню, а то анализировать сложно.
  Я непротив простыней, я скорее против собирать в одном месте разнородные абстракции

  - потом лучше абстрагировать апи для работы непосредственно со стором и апи,
  которое "связывает" стор с реактом. Типа есть у нас вот модуль "slomux"
  и модуль "react-slomux". Ну или как вариант, у нас есть просто
  реактовский компонент "Provider", который мы реализуем только с помощью модуля "react"

  - еще вот редьюсер возвращает в случае "default" пустой объект,
  при том что наш стор это тип "number". Лучше, конечно, оперировать объектом

  - потом вот лучше еще в нашем сторе реализовать функцию "unsubscribe"
  и в компоненте "WrappedComponent" в методе "componentWillUnmount" отписываться от
  изменения стора.

  - еще хорошо бы запретить изменять интервал при запущенном секундомере.
  Во-первых это интуитивно,
  во-вторых сейчас из-за этого может неверно считаться текущее время

  - ну и на всякий случай просто упомяну, что где-то нужно
  импортнуть модули 'react' и 'prop-types'
*/
