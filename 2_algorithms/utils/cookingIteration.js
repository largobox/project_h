function cookingIteration(memoryHeap) {
  for (let i = 0; i < memoryHeap.pans.length; i++) {
    const currentPan = memoryHeap.pans[i];

    if (currentPan.pancakePointer === null) {
      continue;
    }

    if (currentPan.pancakePointer.isOnTopSide) {
      currentPan.pancakePointer.isOnTopSide = false;
      currentPan.pancakePointer.isOnBottomSide = true;

      continue;
    }

    if (currentPan.pancakePointer.isOnBottomSide) {
      if (memoryHeap.pancakes.length > 0) {
        currentPan.pancakePointer = memoryHeap.pancakes.pop();
        currentPan.pancakePointer.isOnTopSide = true;

        continue;
      }

      currentPan.pancakePointer = null;
    }
  }
}

module.exports = cookingIteration;
