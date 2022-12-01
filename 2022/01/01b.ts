import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const summedUp = inputArr
  .map((inv) => {
    return inv.reduce((prev, val) => prev + val, 0);
  })
  .sort((a, b) => b - a);

const topThree = summedUp.slice(0, 3);

const topSum = topThree.reduce((prev, val) => prev + val, 0);

console.log(topSum);
