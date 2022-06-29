import input from './input';

import prepareInput from './helpers/prepareInput';
import { VM } from '../computer/VM';

const inputArr = prepareInput(input);

console.log(String.fromCharCode(10));

const vm = new VM(inputArr);

const grid = [];

let row: string[] = [];

while (vm.working) {
  vm.executeInstruction();

  if (vm.lastCommand === 4) {
    const output = vm.getLastOutput;

    if (output === 10) {
      grid.push(row);
      row = [];
    } else {
      row.push(String.fromCharCode(output));
    }
  }
}

grid.forEach((line) => {
  console.log(line.join(''));
});

const intersections: number[][] = [];

for (let x = 0; x < grid.length; x++) {
  for (let y = 0; y < grid[0].length; y++) {
    if (grid[x][y] === '#') {
      const checks = [
        grid[x - 1]?.[y],
        grid[x + 1]?.[y],
        grid[x][y - 1],
        grid[x][y + 1],
      ];

      if (checks.every((el) => el === '#')) {
        intersections.push([x, y]);
      }
    }
  }
}

let alignmentSum = 0;

intersections.forEach((intersection) => {
  alignmentSum += intersection[0] * intersection[1];
});

console.log(alignmentSum);
