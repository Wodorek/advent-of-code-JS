import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

console.log(inputArr);

const registers: { [key: string]: number } = {};

inputArr.forEach((el) => {
  const [_, possible1, possible2] = el;

  if (isNaN(+possible1)) {
    if (!registers[possible1]) {
      registers[possible1] = 0;
    }
  }

  if (possible2 && isNaN(+possible2)) {
    if (!registers[possible2]) {
      registers[possible2] = 0;
    }
  }
});

let executionIdx = 0;

const executeInstruction = (instruction: string[]) => {
  const [directive, val1, val2] = instruction;
  if (directive === 'cpy') {
    if (isNaN(+val1)) {
      registers[val2] = registers[val1];
    } else {
      registers[val2] = +val1;
    }
  }

  if (directive === 'inc') {
    registers[val1]++;
  }

  if (directive === 'dec') {
    registers[val1]--;
  }

  if (directive === 'jnz') {
    if (registers[val1] !== 0) {
      executionIdx += +val2 - 1;
    }
  }
  executionIdx++;
};

while (executionIdx < inputArr.length) {
  executeInstruction(inputArr[executionIdx]);
}

console.log(registers);
