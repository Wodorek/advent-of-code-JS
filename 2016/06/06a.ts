import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const counts: { [key: number]: { [key: string]: number } } = {};

for (let i = 0; i < inputArr[0].length; i++) {
  counts[i] = {};

  inputArr.forEach((line) => {
    const char = line[i];

    if (counts[i][char]) {
      counts[i][char]++;
    } else {
      counts[i][char] = 1;
    }
  });
}

let message = '';

for (let i = 0; i < Object.keys(counts).length; i++) {
  const values = Object.values(counts[i]);
  const highestValue = Math.max(...values);

  const valueIdx = values.indexOf(highestValue);

  message = message.concat(Object.keys(counts[i])[valueIdx]);
}

console.log(message);
