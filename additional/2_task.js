function map(array, count, handler) {
  const resultArray = [];

  for (let i = 1; i <= count; i++) {
    const arrayItem = array.pop();

    resultArray.push(handler(arrayItem));
  }

  let j = 0;

  while (array.length !== 0) {
    const arrayItem = array.pop();
    const newArrayItem = resultArray[j].then(() => handler(arrayItem));

    resultArray[j] = newArrayItem;

    j++;

    if (j === count) {
      j = 0;
    }
  }

  return Promise.all(resultArray);
}

const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

map(
  Array(random(80, 100))
    .fill()
    .map(() => random(0, 100)),
  4,
  (item) =>
    new Promise((resolve) => {
      setTimeout(resolve, item % 2 === 0 ? 200 : 100);
    })
);

// Тестировал кодом ниже, мб пригодится

// let counter = 1;

// (async () => {
//   await map(
//     Array(random(80, 100))
//       .fill()
//       .map(() => random(0, 100)),
//     4,
//     (item) =>
//       new Promise((resolve) => {
//         setTimeout(() => {
//           console.log(`Order number ${counter}: ${item}`);
//           counter++;
//           resolve()
//         }, item % 2 === 0 ? 200 : 100);
//       })
//   );

//   console.log('Finish');
// })();
