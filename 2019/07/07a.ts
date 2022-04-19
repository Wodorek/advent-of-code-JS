import input from './input';

import prepareInput from './helpers/prepareInput';
import { VM } from '../computer/VM';
import permute from './helpers/permute';

const inputArr = prepareInput(input);

const phases = [0, 1, 2, 3, 4];

let permutations = permute(phases);

const maxOutputs: number[] = [];

permutations.forEach((permutation) => {
  const outputs: number[] = [0];

  permutation.forEach((phase, idx) => {
    const inputs = [phase, outputs[idx]];

    const vm = new VM(inputArr);

    while (vm.working) {
      vm.executeInstruction(inputs[vm.inputIdx]);

      if (vm.lastCommand === 3 || vm.inputIdx === 0) {
        vm.inputIdx++;
      }

      if (vm.lastCommand === 4) {
        outputs.push(vm.getLastOutput);
        break;
      }
    }
  });
  maxOutputs.push(outputs[outputs.length - 1]);
});

console.log(Math.max(...maxOutputs));
