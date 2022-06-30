import input from './input';

import prepareInput from './helpers/prepareInput';
import { VM } from '../computer/VM';

const inputArr = prepareInput(input);

const grid: string[][] = [];

console.log('creating matrix...');

for (let i = 0; i < 1501; i++) {
  const row = new Array();
  row.length = 1500;
  row.fill('.');
  grid.push(row);
}

const inputs: number[][] = [];

console.log('making inputs...');
for (let i = 500; i < 1500; i++) {
  for (let j = 500; j < 1500; j++) {
    inputs.push([i, j]);
  }
}

console.log('cheking...');

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

function isSquare(grid: string[][], x: number, y: number) {
  const toRight = grid[y]?.[x + 99] || '.';
  if (toRight === '.') {
    return false;
  }

  const toDown = grid[y + 99]?.[x] || '.';

  if (toDown === '.') {
    return false;
  }

  return true;
}

const found: { [key: string]: number } = {};

console.log('parsing...');

grid.forEach((line, y) => {
  line.forEach((char, x) => {
    const square = isSquare(grid, x, y);
    if (square) {
      found[x + y] = y * 10000 + x;
    }
  });
});

console.log(found[Math.min(...Object.keys(found).map(Number))]);
