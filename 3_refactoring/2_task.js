// Исходная функция
function drawRating(vote) {
  if (vote >= 0 && vote <= 20) {
    return '★☆☆☆☆';
  }
  else if (vote > 20 && vote <= 40) {
    return '★★☆☆☆';
  }
  else if (vote > 40 && vote <= 60) {
    return '★★★☆☆';
  }
  else if (vote > 60 && vote <= 80) {
    return '★★★★☆';
  }
  else if (vote > 80 && vote <= 100) {
    return '★★★★★';
  }
}

// Отрефакторенная функция
function refactoredDrawRating(vote) {
  if (vote < 0 || vote > 100) {
    /*
      Здесь по ситуации:
      - возвращаем null
      - выбрасываем ошибку
      - вызываем логгер
    */

    return null;
  }

  const starsCount = Math.ceil(vote/20);
 
  switch (starsCount) {
    case 0:
      return '★☆☆☆☆'
    case 1:
      return '★☆☆☆☆'
    case 2:
      return '★★☆☆☆'
    case 3:
      return '★★★☆☆'
    case 4:
      return '★★★★☆'
    case 5:
      return '★★★★★'
    default:
      return null;
      /*
        Здесь нужно зафиксировать vote и starsCount
        - либо выбросываем ошибку с этими значениями
        - либо логируем эти значения

        Потому что раз мы до этой строки дошли, что-то явно пошло нитак

        Как минимум, нужно хотя бы вернуть null, чтобы другие поняли что об этом подумали,
        а не забыли про default сценарий
      */
  }
}

// Проверка работы результата
console.log(drawRating(0) ); // ★☆☆☆☆
console.log(drawRating(1) ); // ★☆☆☆☆
console.log(drawRating(50)); // ★★★☆☆
console.log(drawRating(99)); // ★★★★★

console.log('------------');

console.log(refactoredDrawRating(0) ); // ★☆☆☆☆
console.log(refactoredDrawRating(1) ); // ★☆☆☆☆
console.log(refactoredDrawRating(50)); // ★★★☆☆
console.log(refactoredDrawRating(99)); // ★★★★★

// for (let i = 0; i < 100; i++) {
//   const isEqual = drawRating(i) === refactoredDrawRating(i);

//   if (!isEqual) {
//     console.log('Fail');
//   }
// }