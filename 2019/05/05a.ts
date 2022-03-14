import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

let currPos = 0;

const memory: { currPos: number; opcode: number; params: number[] }[] = [];

const executeCode = (list: number[], input: number) => {
  const asStr = list[currPos].toString().padStart(5, '0');
  const opcode = parseInt(asStr.slice(3));

  console.log(opcode);

  if (isNaN(opcode)) {
    console.log('WARN', opcode);
  }

  const param1 = asStr[2] === '0' ? list[currPos + 1] : currPos + 1;
  const param2 = asStr[1] === '0' ? list[currPos + 2] : currPos + 2;
  const writeTo = asStr[0] === '0' ? list[currPos + 3] : currPos + 3;

  memory.push({ currPos, opcode, params: [param1, param2, writeTo] });
  if (opcode === 1) {
    list[writeTo] = list[param1] + list[param2];
    currPos += 4;
  }

  if (opcode === 2) {
    list[writeTo] = list[param1] * list[param2];
    currPos += 4;
  }

  if (opcode === 3) {
    list[writeTo] = input;
    currPos += 2;
  }

  if (opcode === 4) {
    if (list[writeTo] !== 0) {
      console.log(list[writeTo]);
    }

    currPos += 2;
  }

  if (opcode === 99) {
    return false;
  }

  //remember that

  return true;
};

let shoudContinue = true;

while (shoudContinue) {
  shoudContinue = executeCode(inputArr, 1);
}

console.log(
  memory[memory.length - 1].params.filter((el) => {
    return el > 1000;
  })[0]
);
