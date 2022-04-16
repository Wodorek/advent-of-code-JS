import input from './input';

import prepareInput from './helpers/prepareInput';
import { VM } from '../computer/VM';

const inputArr = prepareInput(input);

inputArr[1] = 12;
inputArr[2] = 2;

const vm = new VM(inputArr);

while (vm.working) {
  vm.executeInstruction();
}

console.log(vm.memory[0]);
