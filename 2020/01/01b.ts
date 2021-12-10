import prepareInput from './helpers/prepareInput';
import input from './input';

const inputArr = prepareInput(input);

let sumsTo = 0;

let curr = 0;
let next = 1;
let moreNext = 2;

while (sumsTo === 0) {
  const sum = inputArr[curr] + inputArr[next] + inputArr[moreNext];

  if (sum === 2020) {
    sumsTo = inputArr[curr] * inputArr[next] * inputArr[moreNext];
  }

  if (moreNext === inputArr.length - 1) {
    next++;
    moreNext = next + 1;
  }
  if (next === inputArr.length - 2) {
    curr++;
    next = curr + 1;
    moreNext = curr + 2;
  }
  moreNext++;
}

console.log(sumsTo);
