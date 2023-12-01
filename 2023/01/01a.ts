import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

function findCalibrationValue(line: string) {
  let left = 0;
  let right = line.length - 1;
  let calibrationValue = '';

  const splitLine = line.split('');

  while (isNaN(+splitLine[left])) {
    left++;
  }

  while (isNaN(+splitLine[right])) {
    right--;
  }

  calibrationValue += splitLine[left];
  calibrationValue += splitLine[right];

  return +calibrationValue;
}

let sum = 0;

inputArr.forEach((el) => {
  sum += findCalibrationValue(el);
});

console.log(sum);
