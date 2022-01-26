import input from './input';

import prepareInput from './helpers/prepareInput';
import getMoveDirection from './helpers/getMoveDirection';

const inputArr = prepareInput(input);

let currentPosition = [0, inputArr[0].indexOf('|')];

let moveDir = [1, 0];

let escaped = false;

const letters = [];

while (!escaped) {
  const nextStep = [
    currentPosition[0] + moveDir[0],
    currentPosition[1] + moveDir[1],
  ];

  if (inputArr[nextStep[0]][nextStep[1]] === '+') {
    moveDir = getMoveDirection(inputArr, nextStep, moveDir);
  }

  if (
    inputArr[nextStep[0]][nextStep[1]] !== '|' &&
    inputArr[nextStep[0]][nextStep[1]] !== '+' &&
    inputArr[nextStep[0]][nextStep[1]] !== '-'
  ) {
    letters.push(inputArr[nextStep[0]][nextStep[1]]);
  }

  if (inputArr[nextStep[0]][nextStep[1]] === ' ') {
    escaped = true;
  }

  currentPosition = nextStep;
}

console.log(letters.join(''));
