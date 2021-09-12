function isPansBusySelector(memoryHeap) {
  let isPansBusy = false;

  for (let i = 0; i < memoryHeap.pans.length; i++) {
    if (memoryHeap.pans[i].pancakePointer !== null) {
      isPansBusy = true;
    }
  }

  return isPansBusy;
}

module.exports = isPansBusySelector;
