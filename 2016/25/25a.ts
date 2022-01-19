import input from './input';

import prepareInput from './helpers/prepareInput';
import testArr from './helpers/testArr';

const inputArr = prepareInput(input);

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

registers['a'] = 1;

let currentOutput: number[] = [];

let iteration = 0;
let executionIdx = 0;

const executeInstruction = (instruction: string[]) => {
  const [directive, val1, val2] = instruction;

  if (directive === 'tgl') {
    const changeIdx = executionIdx + registers[val1];

    const changingInst = inputArr[changeIdx];

    if (!changingInst) {
      executionIdx++;
      return;
    }

    if (changingInst.length === 2) {
      if (changingInst[0] === 'inc') {
        inputArr[changeIdx][0] = 'dec';
      } else {
        inputArr[changeIdx][0] = 'inc';
      }
    } else {
      if (changingInst[0] === 'jnz') {
        inputArr[changeIdx][0] = 'cpy';
      } else {
        inputArr[changeIdx][0] = 'jnz';
      }
    }
  }

  if (directive === 'cpy') {
    if (!isNaN(+instruction[2])) {
      executionIdx++;
      return;
    }
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
    if (
      (!!registers[val1] && registers[val1] !== 0) ||
      (!isNaN(+val1) && +val1 !== 0)
    ) {
      if (!isNaN(+val2)) {
        executionIdx += +val2 - 1;
      } else {
        executionIdx += registers[val2] - 1;
      }
    }
  }

  if (directive === 'out') {
    let item = null;
    if (isNaN(+val1)) {
      item = registers[val1];
    } else {
      item = val1;
    }

    if (currentOutput.length < 15) {
      currentOutput.push(+item);
    } else {
      const correctOutput = testArr(currentOutput);

      if (correctOutput) {
        executionIdx = Infinity;
        console.log('solution:', iteration);
      } else {
        iteration++;
        executionIdx = -1;
        Object.keys(registers).forEach((key) => {
          registers[key] = 0;
        });
        registers['a'] = iteration;
        currentOutput = [];
      }
    }
  }

  executionIdx++;
};

while (executionIdx < inputArr.length) {
  executeInstruction(inputArr[executionIdx]);
}
