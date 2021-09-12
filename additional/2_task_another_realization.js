// Я сначала так сделал, но потом подумал, что это несовсем то что нужно

function map(array, count, handler) {  
  const promiseMap = new Promise((resolve) => {
    let counter = 0;
    const initialArrayLength = array.length;

    function handlePromise(promise) {
      promise.then(() => {
        counter++;

        if (initialArrayLength === counter) {
          resolve();
          return;
        }

        if (array.length === 0) return;

        const arrayItem = array.pop();
        const promiseArrayItem = handler(arrayItem)

        handlePromise(promiseArrayItem);
      })
    }

    for (let i = 1; i <= count; i++) {
      const arrayItem = array.pop();

      const promiseArrayItem = handler(arrayItem)

      handlePromise(promiseArrayItem);
    }
  });

  return promiseMap;
}
