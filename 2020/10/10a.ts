import input from './input';
import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

let sorted = inputArr.sort((a, b) => {
  return a > b ? 1 : -1;
});

sorted = [0, ...sorted, sorted[sorted.length - 1] + 3];

let left = 0;
let right = 1;

const joltDiffs: { [key: number]: number } = {};

while (right < sorted.length) {
  const difference = sorted[right] - sorted[left];

  if (joltDiffs[difference]) {
    joltDiffs[difference]++;
  } else {
    joltDiffs[difference] = 1;
  }
  left++;
  right++;
}

console.log(joltDiffs[1] * joltDiffs[3]);
