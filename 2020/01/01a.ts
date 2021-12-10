import prepareInput from './helpers/prepareInput';
import input from './input';

const inputArr = prepareInput(input);

let sumsTo = 0;

let curr = 0;
let next = 1;

while (sumsTo === 0) {
  const sum = inputArr[curr] + inputArr[next];

  if (sum === 2020) {
    sumsTo = inputArr[curr] * inputArr[next];
  }

  next++;
  if (next === inputArr.length - 2) {
    curr++;
    next = curr + 1;
  }
}

console.log(sumsTo);
