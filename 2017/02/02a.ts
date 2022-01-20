import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

let checksum = 0;

inputArr.forEach((line) => {
  const max = Math.max(...line);
  const min = Math.min(...line);

  checksum += max - min;
});

console.log(checksum);
