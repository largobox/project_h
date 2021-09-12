function dscount(string, s1, s2) {
  const symbolsSequence = `${s1}${s2}`;
  const symbolsSequenceRegExp = new RegExp(symbolsSequence, 'gi');

  let counter = 0;

  while (symbolsSequenceRegExp.exec(string)) {
    symbolsSequenceRegExp.lastIndex = symbolsSequenceRegExp.lastIndex - 1;

    counter++;
  }

  return counter;
}

function test(fn, args, expResult, context) {
  const result = fn.apply(context, args);
  console.assert(result === expResult, `Test failed! Result: ${result}`);
}

test(dscount, ['ab___ab__', 'a', 'b'], 2);
test(dscount, ['___cd____', 'c', 'd'], 1);
test(dscount, ['de_______', 'd', 'e'], 1);
test(dscount, ['12_12__12', '1', '2'], 3);
test(dscount, ['_ba______', 'a', 'b'], 0);
test(dscount, ['_a__b____', 'a', 'b'], 0);
test(dscount, ['-ab-аb-ab', 'a', 'b'], 2);
test(dscount, ['aAa', 'a', 'a'], 2);
