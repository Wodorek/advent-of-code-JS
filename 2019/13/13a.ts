import input from './input';

import prepareInput from './helpers/prepareInput';
import { VM } from '../computer/VM';
import chunkArray from './helpers/chunkArray';

const inputArr = prepareInput(input);

const vm = new VM(inputArr);

while (vm.working) {
  vm.executeInstruction();

  if (vm.outputs.length % 3 === 0) {
  }
}

console.log(vm.outputs);

const gridInfo = chunkArray(vm.outputs, 3);

let totalBlocks = 0;
gridInfo.forEach((tile) => {
  if (tile[2] === 2) {
    totalBlocks++;
  }
});

console.log(totalBlocks);
