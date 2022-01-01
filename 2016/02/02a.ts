import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

console.log(inputArr);

const keyboard = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

let currPos = [1, 1]; //x,y

const move = (instruction: string) => {
  instruction.split('').forEach((el) => {
    if (el === 'U') {
      if (currPos[0] - 1 < 0) {
        currPos[0] = 0;
      } else {
        currPos[0] = currPos[0] - 1;
      }
    }

    if (el === 'D') {
      if (currPos[0] + 1 > 2) {
        currPos[0] = 2;
      } else {
        currPos[0] = currPos[0] + 1;
      }
    }

    if (el === 'L') {
      if (currPos[1] - 1 < 0) {
        currPos[1] = 0;
      } else {
        currPos[1] = currPos[1] - 1;
      }
    }

    if (el === 'R') {
      if (currPos[1] + 1 > 2) {
        currPos[1] = 2;
      } else {
        currPos[1] = currPos[1] + 1;
      }
    }
  });
};

let code: number[] = [];

inputArr.forEach((el) => {
  move(el);
  const number = keyboard[currPos[0]][currPos[1]];
  code.push(number);
});

console.log(code.join(''));
