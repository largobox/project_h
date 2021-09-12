function anagram(s1, s2) {
  const concatenatedString = (s1 + s2).toLowerCase();
  const letterCountList = {};

  for (const char of concatenatedString) {
    const isLetter = /[а-я]/.test(char);

    if (isLetter && letterCountList[char]) {
      letterCountList[char] += 1;
    }

    if (isLetter && !letterCountList[char]) {
      letterCountList[char] = 1;
    }
  }

  for (const prop in letterCountList) {
    if (letterCountList[prop] % 2 !== 0) {
      return false;
    }
  }

  return true;
}

function test(fn, args, expResult, context) {
  const result = fn.apply(context, args);
  console.assert(result === expResult, `Test failed! Result: ${result}`);
}

test(anagram, ["Воз", "зов"], true);
test(anagram, ["пила", "липа"], true);
test(anagram, ["Я в мире — сирота.", "Я Ариост в Риме."], true);
test(anagram, ["Аз есмь строка, живу я, мерой остр.", "За семь морей ростка я вижу рост"], true);
test(anagram, ["Чертог", "горечь"], false);