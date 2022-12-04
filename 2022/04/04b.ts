import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

function checkPair(pair: number[][]) {
  const [elf1, elf2] = pair;

  if (elf1[1] >= elf2[0] && elf1[0] <= elf2[1]) {
    return true;
  }

  return false;
}

//6,8 2,6

let countedPairs = 0;

inputArr.forEach((pair) => {
  checkPair(pair) ? countedPairs++ : null;
});

console.log(countedPairs);
