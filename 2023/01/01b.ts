import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

function findCalibrationValue(line: string) {
  const spelled: { [key: string]: number } = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  };

  let left = 0;
  let right = line.length - 1;
  const end = line.length;
  let calibrationLeft = 0;
  let calibrationRight = 0;

  const splitLine = line.split('');

  outer1: while (isNaN(+splitLine[left])) {
    left++;

    const leftSubstr = line.slice(0, left + 1);

    for (let num of Object.keys(spelled)) {
      if (leftSubstr.includes(num)) {
        calibrationLeft = spelled[num];

        break outer1;
      }
    }
  }

  outer2: while (isNaN(+splitLine[right])) {
    right--;

    const rightSubstr = line.slice(right, end);

    for (let num of Object.keys(spelled)) {
      if (rightSubstr.includes(num)) {
        calibrationRight = spelled[num];

        break outer2;
      }
    }
  }

  if (calibrationLeft === 0) {
    calibrationLeft = +line[left];
  }

  if (calibrationRight === 0) {
    calibrationRight = +line[right];
  }
  return +`${calibrationLeft}${calibrationRight}`;
}

let sum = 0;

inputArr.forEach((el) => {
  sum += findCalibrationValue(el);
});

console.log(sum);
