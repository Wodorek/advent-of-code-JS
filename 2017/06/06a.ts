import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const testArr = [0, 2, 7, 0];

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

const states = [inputArr.toString()];

let iteration = 0;
let currentBank = inputArr;

while (true) {
  const redistributed = redistribute(currentBank);

  if (states.includes(redistributed.toString())) {
    break;
  }

  currentBank = redistributed;

  states.push(redistributed.toString());

  iteration++;
}

console.log(iteration + 1);
