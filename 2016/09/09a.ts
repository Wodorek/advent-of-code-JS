import input from './input';

const test1 = 'ADVENT';
const test2 = 'A(1x5)BC';
const test3 = '(3x3)XYZ';
const test4 = 'A(2x2)BCD(2x2)EFG';
const test5 = '(6x1)(1x3)A';
const test6 = 'X(8x2)(3x3)ABCY';

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

console.log(parseString(test1) === 'ADVENT');
console.log(parseString(test2) === 'ABBBBBC');
console.log(parseString(test3) === 'XYZXYZXYZ');
console.log(parseString(test4) === 'ABCBCDEFEFG');
console.log(parseString(test5) === '(1x3)A');
console.log(parseString(test6) === 'X(3x3)ABC(3x3)ABCY');

console.log(parseString('xab(1x2)caaaaaa'));
