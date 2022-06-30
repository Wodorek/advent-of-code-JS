import input from './input';

import prepareInput from './helpers/prepareInput';
import { VM } from '../computer/VM';
import turnIntoCommand from './helpers/turnIntoCommand';

const inputArr = prepareInput(input);

console.log(String.fromCharCode(10));

const vm = new VM(inputArr);

let row: string[] = [];

let inputIdx = 0;

const inputs: number[] = [
  ...turnIntoCommand('NOT A J'),
  ...turnIntoCommand('NOT B T'),
  ...turnIntoCommand('OR T J'),
  ...turnIntoCommand('NOT C T'),
  ...turnIntoCommand('OR T J'),
  ...turnIntoCommand('AND D J'),
  ...turnIntoCommand('NOT I T'),
  ...turnIntoCommand('NOT T T'),
  ...turnIntoCommand('OR F T'),
  ...turnIntoCommand('AND E T'),
  ...turnIntoCommand('OR H T'),
  ...turnIntoCommand('AND T J'),
  ...turnIntoCommand('RUN'),
];

while (vm.working) {
  vm.executeInstruction(inputs[inputIdx]);

  if (vm.lastCommand === 3) {
    inputIdx++;
  }

  if (vm.lastCommand === 4) {
    const output = vm.getLastOutput;

    if (output === 10) {
      console.log(row.join(''));
      row = [];
    } else {
      row.push(String.fromCharCode(output));
    }
  }
}

console.log(vm.getLastOutput);
