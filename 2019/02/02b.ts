import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const executeCode = (pos: number, list: number[]) => {
  const opcode = list[pos];

  if (opcode === 1) {
    list[list[pos + 3]] = list[list[pos + 1]] + list[list[pos + 2]];
  }

  if (opcode === 2) {
    list[list[pos + 3]] = list[list[pos + 1]] * list[list[pos + 2]];
  }

  if (opcode === 99) {
    return false;
  }

  return true;
};

const runProgram = (noun: number, verb: number) => {
  const list = [...inputArr];

  let shoudContinue = true;

  list[1] = noun;
  list[2] = verb;

  let currPos = 0;

  while (shoudContinue) {
    shoudContinue = executeCode(currPos, list);
    currPos += 4;
  }

  return list[0];
};

for (let noun = 0; noun < 99; noun++) {
  for (let verb = 0; verb < 99; verb++) {
    const value = runProgram(noun, verb);
    if (value === 19690720) {
      console.log('solution:', 100 * noun + verb);
    }
  }
}
