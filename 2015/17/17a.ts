import input from './input';

import prepareInput from './helpers/prepareInput';
import permute from './helpers/permute';

const inputArr = prepareInput(input);

//permute function found here:
//https://stackoverflow.com/questions/43241174/javascript-generating-all-combinations-of-elements-in-a-single-array-in-pairs
const possibleCombinations = permute(inputArr);

let matches = 0;

possibleCombinations.forEach((combination) => {
  const total = combination.reduce((prev, val) => {
    return prev + val;
  }, 0);

  if (total === 150) {
    matches++;
  }
});

console.log(matches);
