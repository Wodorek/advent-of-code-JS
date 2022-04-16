import input from './input';

import prepareInput from './helpers/prepareInput';
import { VM } from '../computer/VM';

const inputArr = prepareInput(input);

console.log(inputArr);

function testNounVerb(noun: number, verb: number) {
  const memory = inputArr.map((el) => el);
  memory[1] = noun;
  memory[2] = verb;

  const vm = new VM(memory);

  while (vm.working) {
    vm.executeInstruction();
  }

  return vm.memory[0];
}

for (let noun = 0; noun < 99; noun++) {
  for (let verb = 0; verb < 99; verb++) {
    const value = testNounVerb(noun, verb);

    if (value === 19690720) {
      console.log('solution:', 100 * noun + verb);
      break;
    }
  }
}
