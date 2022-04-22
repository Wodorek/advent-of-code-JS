import input from './input';

import prepareInput from './helpers/prepareInput';
import { VM } from '../computer/VM';

const inputArr = prepareInput(input);

// const inputs = [
//   [109, -1, 4, 1, 99],
//   [109, -1, 104, 1, 99],
//   [109, -1, 204, 1, 99],
//   [109, 1, 9, 2, 204, -6, 99],
//   [109, 1, 109, 9, 204, -6, 99],
//   [109, 1, 209, -1, 204, -106, 99],
//   [109, 1, 3, 3, 204, 2, 99],
//   [109, 1, 203, 2, 204, 2, 99],
// ];

// inputs.forEach((input) => {
//   const vm = new VM(input);

//   while (vm.working) {
//     vm.executeInstruction();
//   }

//   console.log(vm.outputs);
// });

const vm = new VM(inputArr);

while (vm.working) {
  vm.executeInstruction(1);
}
console.log(vm.outputs);
