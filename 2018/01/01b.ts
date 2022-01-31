import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const frequencies: number[] = [0];

let frequency = 0;

let repeatedFrequency = null;

while (!repeatedFrequency) {
  for (let i = 0; i < inputArr.length; i++) {
    frequency += inputArr[i];

    if (frequencies.includes(frequency)) {
      repeatedFrequency = frequency;
      break;
    }

    frequencies.push(frequency);
  }
}

console.log(repeatedFrequency);
