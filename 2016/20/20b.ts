import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);
const sortedArr = inputArr.sort((a, b) => {
  return a[0] < b[0] ? -1 : 1;
});

let currentMin = 0;
let totalUnblocked = 0;

for (let i = 0; i < inputArr.length; i++) {
  const el = inputArr[i];

  if (el[0] <= currentMin + 1) {
    currentMin = Math.max(currentMin, el[1]);
  } else {
    console.log(el[0] - currentMin);
    totalUnblocked += el[0] - currentMin - 1;
    currentMin = el[1];
  }
}

console.log(totalUnblocked);
