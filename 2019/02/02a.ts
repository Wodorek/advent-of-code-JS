import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

let currPos = 0;

const executeCode = (list: number[]) => {
  const opcode = list[currPos];

  if (opcode === 1) {
    list[list[currPos + 3]] = list[list[currPos + 1]] + list[list[currPos + 2]];
  }

  if (opcode === 2) {
    list[list[currPos + 3]] = list[list[currPos + 1]] * list[list[currPos + 2]];
  }

  if (opcode === 99) {
    return false;
  }

  currPos += 4;

  return true;
};

let shoudContinue = true;

inputArr[1] = 12;
inputArr[2] = 2;
console.log(inputArr);
while (shoudContinue) {
  shoudContinue = executeCode(inputArr);
}

console.log(inputArr[0]);
