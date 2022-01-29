import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

console.log(inputArr);

const registers: { [key: string]: number } = {};

'abcdefgh'.split('').forEach((char) => {
  registers[char] = 0;
});

let executionIdx = 0;

let muls = 0;

const executeInstruction = (inst: string[]) => {
  const [type, val1, val2] = inst;

  let actualVal = 0;

  if (val2) {
    actualVal = isNaN(+val2) ? registers[val2] : +val2;
  }

  if (type === 'set') {
    registers[val1] = actualVal;
  }

  if (type === 'sub') {
    registers[val1] -= actualVal;
  }

  if (type === 'mul') {
    muls++;
    registers[val1] = registers[val1] * actualVal;
  }

  if (type === 'mod') {
    registers[val1] = registers[val1] % actualVal;
  }

  if (type === 'jnz') {
    const canJump = isNaN(+val1) ? registers[val1] : +val1;

    if (canJump !== 0) {
      executionIdx += +val2;
      if (executionIdx > inputArr.length - 1 || executionIdx < 0) {
        return false;
      }
      return true;
    }
  }

  executionIdx++;
  return true;
};

let shouldContinue = true;

while (shouldContinue) {
  shouldContinue = executeInstruction(inputArr[executionIdx]);
}

console.log(muls);
