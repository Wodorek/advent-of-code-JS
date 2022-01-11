import input from './input';

const parseString = (str: string) => {
  let outputStr = '';

  let currSubstr = '';
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== '(') {
      currSubstr = currSubstr.concat(str[i]);
    }

    if (str[i] === '(') {
      outputStr = outputStr.concat(currSubstr);
      currSubstr = '';

      let forwardLookup = i;
      let dataSlice = '';

      while (str[forwardLookup] !== ')') {
        forwardLookup++;
      }
      dataSlice = str.slice(i, forwardLookup + 1);

      const dataPoints = dataSlice.replace('(', '').replace(')', '').split('x');

      const charCount = +dataPoints[0];
      const repeats = +dataPoints[1];

      for (let j = 0; j < repeats; j++) {
        outputStr = outputStr.concat(
          str.slice(i + dataSlice.length, i + dataSlice.length + charCount)
        );
      }
      i += charCount + dataSlice.length - 1;
    }

    if (i === str.length - 1) {
      outputStr = outputStr.concat(currSubstr);
    }
  }

  return outputStr;
};

console.log(parseString(input).length);

console.log(parseString('ADVENT\nA(1x5)BC').length);
console.log(parseString('ADVENT\nA(1x5)BC'.replaceAll(/\s/g, '')).length);
