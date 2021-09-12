const cookingIteration = require('./cookingIteration');
const isPansBusySelector = require('./isPansBusySelector');

function startCookingIteration (memoryHeap) {
  setTimeout(() => {
    cookingIteration(memoryHeap);

    memoryHeap.iterationCounter++;
    console.log('Iteration number: ', memoryHeap.iterationCounter);

    if (isPansBusySelector(memoryHeap)) {
      startCookingIteration(memoryHeap)

      return
    }

    console.log('Result: ', memoryHeap.iterationCounter);
  }, memoryHeap.delay);  
}

module.exports = startCookingIteration