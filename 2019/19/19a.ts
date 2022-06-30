import input from './input';

import prepareInput from './helpers/prepareInput';
import { VM } from '../computer/VM';

const inputArr = prepareInput(input);

const grid: string[][] = [];

for (let i = 0; i < 51; i++) {
  const row = new Array();
  row.length = 51;
  row.fill('.');
  grid.push(row);
}

const inputs: number[][] = [];

for (let i = 0; i < 50; i++) {
  for (let j = 0; j < 50; j++) {
    inputs.push([i, j]);
  }
}

inputs.forEach((input) => {
  let inputIdx = 0;

  const vm = new VM(inputArr);

  while (vm.working) {
    vm.executeInstruction(input[inputIdx]);
    if (vm.lastCommand === 3) {
      inputIdx++;
    }
  }

  if (vm.getLastOutput === 1) {
    grid[input[0]][input[1]] = '#';
  }
});

let totalAffected = 0;

grid.forEach((line) => {
  console.log(line.join(''));
  line.forEach((char) => {
    if (char === '#') {
      totalAffected++;
    }
  });
});

console.log(totalAffected);
