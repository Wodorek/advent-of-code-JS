import input from './input';

let removed = 0;

const substrings: [string, number][] = [];

const parseString = (str: string, times: number) => {
  let outputStr = '';

  for (let i = 0; i < str.length; i++) {
    if (str[i] === '(') {
      let forwardLookup = i;
      let dataSlice = '';

      while (str[forwardLookup] !== ')') {
        forwardLookup++;
      }
      dataSlice = str.slice(i, forwardLookup + 1);

      const dataPoints = dataSlice.replace('(', '').replace(')', '').split('x');

      const charCount = +dataPoints[0];
      const repeats = +dataPoints[1];

      const forwardSlice = str.slice(
        forwardLookup + 1,
        forwardLookup + charCount + 1
      );

      if (!forwardSlice[0].includes('(')) {
        removed += forwardSlice.length * times * repeats;
      } else {
        substrings.push([forwardSlice, repeats * times]);
      }
      i += dataSlice.length + forwardSlice.length - 1;
    } else {
      removed++;
    }
  }
};

let inputStr = input;

parseString(inputStr, 1);

while (substrings.length > 0) {
  const currStr = substrings.pop()!;

  parseString(...currStr);
}

console.log(removed);
