import input from './input';

import prepareInput from './helpers/prepareInput';
import { VM } from '../computer/VM';

const inputArr = prepareInput(input);

const vm = new VM(inputArr);
vm.memory[0] = 2;

const tileTypes = {
  0: '.',
  1: '|',
  2: '#',
  3: '_',
  4: 'O',
};

const grid: string[][] = [];

for (let i = 0; i < 20 + 1; i++) {
  const arr = new Array();
  arr.length = 37 + 1;
  arr.fill('.');
  grid.push(arr);
}

let outputs = 0;

let ballPosition = 0;
let paddlePosition = 0;

let joystickPosition = 0;

while (vm.working) {
  vm.executeInstruction(joystickPosition);

  if (vm.lastCommand === 4) {
    outputs++;
  }

  if (outputs === 3) {
    const tile = vm.outputs.slice(vm.outputs.length - 3);

    if (tile[0] !== -1) {
      if (tile[2] === 3) {
        paddlePosition = tile[0];
      } else if (tile[2] === 4) {
        ballPosition = tile[0];
      }

      if (ballPosition > paddlePosition) {
        joystickPosition = 1;
      } else if (ballPosition < paddlePosition) {
        joystickPosition = -1;
      } else {
        joystickPosition = 0;
      }

      grid[tile[1]][tile[0]] = tileTypes[tile[2] as keyof typeof tileTypes];
    } else {
      console.log(`current score ${tile[2]}`);
    }

    outputs = 0;
  }
}
