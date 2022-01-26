import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const registers: { [key: string]: number } = {};

//initialize registers

inputArr.forEach((el) => {
  if (isNaN(+el[1])) {
    registers[el[1]] = 0;
  }

  if (el[2] && isNaN(+el[2])) {
    registers[el[2]] = 0;
  }
});

let recentlyPlayed = 0;
let executionIdx = 0;

const executeInstruction = (inst: string[]) => {
  const [type, val1, val2] = inst;

  let actualVal = 0;

  if (val2) {
    actualVal = isNaN(+val2) ? registers[val2] : +val2;
  }

  if (type === 'snd') {
    recentlyPlayed = registers[val1];
  }

  if (type === 'set') {
    registers[val1] = actualVal;
  }

  if (type === 'add') {
    registers[val1] += actualVal;
  }

  if (type === 'mul') {
    registers[val1] = registers[val1] * +val2;
  }

  if (type === 'mod') {
    registers[val1] = registers[val1] % actualVal;
  }

  if (type === 'rcv') {
    if (registers[val1] !== 0) {
      console.log('recovered:', recentlyPlayed);
      return false;
    }
  }

  if (type === 'jgz') {
    const canJump = isNaN(+val1) ? registers[val1] : +val1;

    if (canJump > 0) {
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
