import input from './input';

import prepareInput from './helpers/prepareInput';
import { VM } from '../computer/VM';

const inputArr = prepareInput(input);

const vm = new VM(inputArr);

while (vm.working) {
  vm.executeInstruction(5);
}

console.log(vm.outputs[vm.outputs.length - 1]);
