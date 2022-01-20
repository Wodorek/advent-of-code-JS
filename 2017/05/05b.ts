import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

console.log(inputArr);

let currIdx = 0;
let stepsTaken = 0;

while (currIdx < inputArr.length && currIdx >= 0) {
  const move = inputArr[currIdx];

  if (move >= 3) {
    inputArr[currIdx]--;
  } else {
    inputArr[currIdx]++;
  }

  currIdx += move;
  stepsTaken++;
}

console.log(stepsTaken);
