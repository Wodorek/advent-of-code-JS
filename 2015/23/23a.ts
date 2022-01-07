import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

let currentIdx = 0;
const registers = {
  a: 0,
  b: 0,
};

while (currentIdx < inputArr.length) {
  const instruction = inputArr[currentIdx];

  if (instruction[0] === 'hlf') {
    const register = instruction[1] as keyof typeof registers;

    registers[register] = registers[register] / 2;
  }

  if (instruction[0] === 'tpl') {
    const register = instruction[1] as keyof typeof registers;

    registers[register] = registers[register] * 3;
  }

  if (instruction[0] === 'inc') {
    const register = instruction[1] as keyof typeof registers;

    registers[register]++;
  }

  if (instruction[0] === 'jmp') {
    const jumpBy =
      instruction[1][0] === '+'
        ? +instruction[1].slice(1)
        : +instruction[1].slice(1) * -1;

    currentIdx += jumpBy;
    currentIdx--;
  }

  if (instruction[0] === 'jie') {
    const register = instruction[1][0] as keyof typeof registers;

    const jumpBy =
      instruction[1][1][0] === '+'
        ? +instruction[1][1].slice(1)
        : +instruction[1][1].slice(1) * -1;

    if (registers[register] % 2 === 0) {
      currentIdx += jumpBy;
      currentIdx--;
    }
  }

  if (instruction[0] === 'jio') {
    const register = instruction[1][0] as keyof typeof registers;

    const jumpBy =
      instruction[1][1][0] === '+'
        ? +instruction[1][1].slice(1)
        : +instruction[1][1].slice(1) * -1;

    if (registers[register] === 1) {
      currentIdx += jumpBy;
      currentIdx--;
    }
  }

  currentIdx++;
}

console.log(registers.b);
