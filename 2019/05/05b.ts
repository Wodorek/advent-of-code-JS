import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

let currPos = 0;

const memory: { currPos: number; asStr: string; params: number[] }[] = [];

const supportedOpcodes = [1, 2, 3, 4, 5, 6, 7, 8, 99];

const executeCode = (list: number[], input: number) => {
  const asStr = list[currPos].toString().padStart(5, '0');
  const opcode = parseInt(asStr.slice(3));

  const param1 = asStr[2] === '0' ? list[currPos + 1] : currPos + 1;
  const param2 = asStr[1] === '0' ? list[currPos + 2] : currPos + 2;
  const param3 = asStr[0] === '0' ? list[currPos + 3] : currPos + 3;

  if (!supportedOpcodes.includes(opcode)) {
    console.log('Opcode not supported');
    console.table({
      currPos,
      opcode,
      asStr,
      param1,
      param2,
      param3,
    });

    return false;
  }

  memory.push({ currPos, asStr, params: [param1, param2, param3] });
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
    return false;
  }

  if (opcode === 5) {
    if (param1 !== 0) {
      currPos = param2;
    }
  }

  if (opcode === 6) {
    if (param1 === 0) {
      currPos = param2;
    }
  }

  if (opcode === 7) {
    if (param1 < param2) {
      list[param3] = 1;
    } else {
      list[param3] = 0;
    }
    currPos += 4;
  }

  if (opcode === 8) {
    if (param1 === param2) {
      list[param3] = 1;
    } else {
      list[param3] = 0;
    }
    currPos += 4;
  }

  if (opcode === 99) {
    return false;
  }

  return true;
};

let shoudContinue = true;

while (shoudContinue) {
  shoudContinue = executeCode(inputArr, 5);
}

console.log(memory);

// console.log(
//   memory[memory.length - 1].params.filter((el) => {
//     return el > 1000;
//   })[0]
// );
