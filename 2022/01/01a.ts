import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const summedUp = inputArr.map((inv) => {
  return inv.reduce((prev, val) => {
    return prev + val;
  }, 0);
});

console.log(Math.max(...summedUp));
