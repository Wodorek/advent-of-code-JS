import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

console.log(inputArr);

const basePattern = [0, 1, 0, -1];

const selectFromPattern = (n: number, index: number) => {
  return basePattern[Math.floor(((index + 1) % (4 * n)) / n)];
};

for (let i = 0; i < 100; i++) {
  for (let j = 0; j < inputArr.length; j++) {
    let num = 0;

    for (let k = 0; k < inputArr.length; k++) {
      const multiplier = selectFromPattern(j + 1, k);

      num += inputArr[k] * multiplier;
    }

    inputArr[j] = Math.abs(num) % 10;
  }
}

console.log(inputArr.slice(0, 8).join(''));
