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

//before I managed to think about optimizing it with multiplication, it already finished, so...
registers['a'] = 12;

let executionIdx = 0;

const executeInstruction = (instruction: string[]) => {
  const [directive, val1, val2] = instruction;

  if (directive === 'tgl') {
    console.log(registers[val1]);
    const changeIdx = executionIdx + registers[val1];

    const changingInst = inputArr[changeIdx];
    console.log(changingInst);
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
    if (registers[val1] !== 0 || (!isNaN(+val1) && +val1 !== 0)) {
      if (!isNaN(+val2)) {
        executionIdx += +val2 - 1;
      } else {
        executionIdx += registers[val2] - 1;
      }
    }
  }
  executionIdx++;
};

while (executionIdx < inputArr.length) {
  executeInstruction(inputArr[executionIdx]);
}

console.log(inputArr);
console.log(registers);
