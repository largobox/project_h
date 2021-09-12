function treeWalking(node, handler) {
  const arr = [node];

  while (arr.length > 0) {
    const currentNode = arr.pop();
    handler(currentNode);

    for (const child of currentNode.childNodes) {
      const isUnnecessaryNode = (
        child.nodeType === Node.TEXT_NODE && child.nodeValue.match(/\n/) !== null
      );

      if (isUnnecessaryNode) {
        continue;
      }

      arr.push(child);
    }
  }
};

let counter = 0;

treeWalking(document.getElementById('root'), (node) => {
  counter++;
});

console.assert(counter === 16, `Test failed! Result: ${counter}`);
