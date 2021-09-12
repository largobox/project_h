function cookingInitialze(memoryHeap) {
  const panInstance = { pancakePointer: null };
  const pancakeInstance = { isOnTopSide: false, isOnBottomSide: false };

  memoryHeap.pans = [];
  memoryHeap.pancakes = [];

  // Создаем начальное число сковородок
  for (let i = 0; i < memoryHeap.pansCount; i++) {
    memoryHeap.pans[i] = {...panInstance};
  }

  // Создаем начальное число панкейков
  for (let i = 0; i < memoryHeap.pancakesCount; i++) {
    memoryHeap.pancakes[i] = {...pancakeInstance};
  }

  // Начальное заполнение сковородок панкейками
  for (let i = 0; i < memoryHeap.pans.length; i++) {
    const currentPan = memoryHeap.pans[i];

    if (memoryHeap.pancakes.length > 0) {
      currentPan.pancakePointer = memoryHeap.pancakes.pop();
      currentPan.pancakePointer.isOnTopSide = true;
    }
  }
}

module.exports = cookingInitialze;