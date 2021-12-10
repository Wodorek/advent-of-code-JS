import input from './input';
import mapInputToDigits from './helpers/mapInputToDigits';
import prepareInput from './helpers/prepareInput';
import getDisplayedNumber from './helpers/getDisplayedNumber';

const inputArr = prepareInput(input);

let sum = 0;

for (let i = 0; i < inputArr.length; i++) {
  const element = inputArr[i];
  sum += getDisplayedNumber(mapInputToDigits(element[0]), element[1]);
}

console.log(sum);
