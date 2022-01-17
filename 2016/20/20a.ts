import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);
const sortedArr = inputArr.sort((a, b) => {
  return a[0] < b[0] ? -1 : 1;
});

let currentMin = 0;

for (let i = 0; i < sortedArr.length; i++) {
  const el = inputArr[i];

  if (el[0] <= currentMin + 1) {
    currentMin = Math.max(currentMin, el[1]);
  }
}

console.log(currentMin + 1);
