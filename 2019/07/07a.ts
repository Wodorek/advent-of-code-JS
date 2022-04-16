import input from './input';

import prepareInput from './helpers/prepareInput';
import VM from '../computer/VM';
import permute from './helpers/permute';

const inputArr = prepareInput(input);

const phases = [0, 1, 2, 3, 4];

const permutations = permute(phases);

const maxOutputs: number[] = [];

permutations.forEach((permutation) => {
  const outputs: number[] = [];

  permutation.forEach((phase, idx) => {
    const inputs = [phase, outputs[idx - 1] || 0];

    let shouldContinue = true;

    const vm = new VM(inputArr);

    while (shouldContinue) {
      shouldContinue = vm.exectuteOperation(inputs, outputs);
    }
  });

  maxOutputs.push(outputs[outputs.length - 1]);
});

console.log(Math.max(...maxOutputs));
