function checkSyntax(string) {
  const bufferArr = [];
  const oppositeBracketsDictionary = { '>': '<', '}': '{', ']': '[', ')': '(' };

  for (const element of string) {
    if (/(<|{|\[|\()/.test(element)) {
      bufferArr.push(element);
    }

    if (/(>|}|\)|\])/.test(element)) {
      if (bufferArr.length === 0) {
        return 1;
      }

      if (bufferArr[bufferArr.length - 1] === oppositeBracketsDictionary[element]) {
        bufferArr.pop();
      }
    }
  }

  if (bufferArr.length === 0) {
    return 0;
  }

  return 1;
};

function test(fn, args, expResult, context) {
  const result = fn.apply(context, args);
  console.assert(result === expResult, `Test failed! Result: ${result}`);
}

test(checkSyntax, ["---(++++)----"], 0);
test(checkSyntax, [""], 0);
test(checkSyntax, ["before ( middle []) after "], 0);
test(checkSyntax, [") ("], 1);
test(checkSyntax, ["} {"], 1);
test(checkSyntax, ["<(   >)"], 1);
test(checkSyntax, ["(  [  <>  ()  ]  <>  )"], 0);
test(checkSyntax, ["   (      [)"], 1);