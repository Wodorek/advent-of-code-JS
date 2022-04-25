import input from './input';

import prepareInput from './helpers/prepareInput';
import { VM } from '../computer/VM';
import chunkArray from './helpers/chunkArray';
import drawDisplay from './helpers/drawDisplay';

const inputArr = prepareInput(input);
inputArr[0] = 2;

const vm = new VM(inputArr);

const ballPosition = [-1, -1];
const paddlePosition = [-1, -1];

let points = 0;

const display: string[][] = [];
display.length = 100;
display.fill(new Array(50).fill('.'));

const tiles = {
  0: '.',
  1: '|',
  2: 'b',
  3: '-',
  4: 'o',
};

while (vm.working) {
  let joystickPosition = 0;

  if (paddlePosition[0] > ballPosition[0]) {
    joystickPosition = -1;
  }

  if (paddlePosition[0] < ballPosition[0]) {
    joystickPosition = 1;
  }

  vm.executeInstruction(joystickPosition);

  if (vm.outputs.length > 3 && vm.outputs.length % 3 === 0) {
    const tile = vm.outputs.slice(vm.outputs.length - 3);

    if (tile[0] !== -1) {
      display[tile[1]][tile[0]] = tiles[tile[2] as keyof typeof tiles];
    }

    if (tile[0] === -1 && tile[1] === 0) {
      points = tile[2];
    }

    if (tile[2] === 3) {
      ballPosition[0] = tile[0];
      ballPosition[1] = tile[1];
    }

    if (tile[2] === 4) {
      paddlePosition[0] = tile[0];
      paddlePosition[1] = tile[1];
    }
  }
}

const chunks = chunkArray(vm.outputs, 3);

chunks.forEach((chunk) => {
  display[chunk[1]][chunk[0]] = tiles[chunk[2] as keyof typeof tiles];
});

display.forEach((line) => {
  console.log(line.join(' '));
});
