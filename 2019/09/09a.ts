import input from './input';

import prepareInput from './helpers/prepareInput';
import { VM } from '../computer/VM';

const inputArr = prepareInput(input);

console.log(inputArr);

const vm = new VM(inputArr);

while (vm.working) {
  vm.executeInstruction();
}

console.log(vm.outputs);
