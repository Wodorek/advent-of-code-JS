import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const redistribute = (bank: number[]) => {
  const newBank = [...bank];
  let value = Math.max(...newBank);
  let idx = newBank.indexOf(value);
  newBank[idx] = 0;

  let i = idx + 1;
  while (value > 0) {
    if (i > newBank.length - 1) {
      i = 0;
    }

    newBank[i]++;
    value--;

    i++;
  }

  return newBank;
};

let states = [inputArr.toString()];

let iteration = 0;
let loopStart = 0;
let currentBank = inputArr;
let seenState = '';

while (true) {
  const redistributed = redistribute(currentBank);

  if (seenState === redistributed.toString()) {
    break;
  }

  if (states.includes(redistributed.toString())) {
    seenState = redistributed.toString();
    states = [];
    loopStart = iteration + 1;
  }

  currentBank = redistributed;

  states.push(redistributed.toString());

  iteration++;
}

console.log(iteration + 1 - loopStart);
