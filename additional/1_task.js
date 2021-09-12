const banners = [
  { weight: 10, id: 1 },
  { weight: 130, id: 2 },
  { weight: 40, id: 3 },
  { weight: 25, id: 4 },
  { weight: 60, id: 5 },
  { weight: 12, id: 6 },
];

// function getRandomFromInterval(min, max) {
//   return Math.round(Math.random() * (max - min)) + min;
// }

function getRandomBanner(banners) {
  let weightsSum = 0;

  banners.forEach(item => {
    const nextMin = weightsSum + item.weight;

    item.range = [
      weightsSum,
      nextMin - 1
    ];

    weightsSum = nextMin;
  });

  const randNumber = Math.round(Math.random() * weightsSum);

  const findedBanner = banners.find(
    item => (randNumber >= item.range[0] && randNumber <= item.range[1])
  );

  return findedBanner;
}

const randBanner = getRandomBanner(banners); // рандомный баннер из списка
