import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

let currPos = 0;

const executeCode = (list: number[], input: number) => {
  const asStr = list[currPos].toString().padStart(5, '0');
  const opcode = parseInt(asStr.slice(3));

  if (isNaN(opcode)) {
    console.log('WARN', opcode);
  }

  const param1 = asStr[2] === '0' ? list[currPos + 1] : currPos + 1;
  const param2 = asStr[1] === '0' ? list[currPos + 2] : currPos + 2;
  const param3 = asStr[0] === '0' ? list[currPos + 3] : currPos + 3;

  if (opcode === 1) {
    list[param3] = list[param1] + list[param2];
    currPos += 4;
  }

  if (opcode === 2) {
    list[param3] = list[param1] * list[param2];
    currPos += 4;
  }

  if (opcode === 3) {
    list[param3] = input;
    currPos += 2;
  }

  if (opcode === 4) {
    console.log(list[param3]);
    currPos += 2;
  }

  if (opcode === 99) {
    return false;
  }

  //remember that

  return true;
};

let shoudContinue = true;

console.log(inputArr);
while (shoudContinue) {
  shoudContinue = executeCode(inputArr, 1);
}
