import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const keyboard = [
  [null, null, 1, null, null],
  [null, 2, 3, 4, null],
  [5, 6, 7, 8, 9],
  [null, 'A', 'B', 'C', null],
  [null, null, 'D', null, null],
];

let currPos = [2, 0]; //x,y

const move = (instruction: string) => {
  instruction.split('').forEach((el) => {
    if (el === 'U') {
      if (keyboard?.[currPos[0] - 1]?.[currPos[1]] != null) {
        currPos = [currPos[0] - 1, currPos[1]];
      }
    }

    if (el === 'D') {
      if (keyboard?.[currPos[0] + 1]?.[currPos[1]] != null) {
        currPos = [currPos[0] + 1, currPos[1]];
      }
    }

    if (el === 'L') {
      if (keyboard?.[currPos[0]]?.[currPos[1] - 1] != null) {
        currPos = [currPos[0], currPos[1] - 1];
      }
    }

    if (el === 'R') {
      if (keyboard?.[currPos[0]]?.[currPos[1] + 1] != null) {
        currPos = [currPos[0], currPos[1] + 1];
      }
    }
  });
};

let code: (string | number | null)[] = [];

inputArr.forEach((el) => {
  move(el);
  const number = keyboard[currPos[0]][currPos[1]];
  code.push(number);
});

console.log(code.join(''));
