// Исходная функция
function func(s, a, b) {

  if (s.match(/^$/)) {
    return -1;
  }
  
  var i = s.length -1;
  var aIndex =     -1;
  var bIndex =     -1;
  
  while ((aIndex == -1) && (bIndex == -1) && (i > 0)) {
    if (s.substring(i, i +1) == a) {
      aIndex = i;
    }
    if (s.substring(i, i +1) == b) {
      bIndex = i;
    }
    i = i - 1;
  }
  
  if (aIndex != -1) {
    if (bIndex == -1) {
      return aIndex;
    }
    else {
      return Math.max(aIndex, bIndex);
    }
  }
  
  if (bIndex != -1) {
    return bIndex;
  }
  else {
    return -1;
  }
}

// Отрефакторенная функция
function refactoredFunc (inputString, char1, char2) {
  const char1Index = inputString.lastIndexOf(char1);
  const char2Index = inputString.lastIndexOf(char2);

  return Math.max(char1Index, char2Index);
}

const result = func('maow maow', 'm', 'o');
const result2 = refactoredFunc('maow maow', 'm', 'o');

console.log('result: ', result);
console.log('result2: ', result2);
