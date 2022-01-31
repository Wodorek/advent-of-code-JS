import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const sum = inputArr.reduce((prev, val) => {
  return prev + val;
}, 0);

console.log(sum);
