import input from './input';

import prepareInput from './helpers/prepareInput';
import { VM } from '../computer/VM';
import chunkArray from './helpers/chunkArray';

const inputArr = prepareInput(input);

const vm = new VM(inputArr);

const tileTypes = {
  0: '.',
  1: '|',
  2: '#',
  3: '_',
  4: 'O',
};

while (vm.working) {
  vm.executeInstruction();
}

const gridInfo = chunkArray(vm.outputs, 3);

let maxWidth = -Infinity;
let maxHeight = -Infinity;

gridInfo.forEach((tile) => {
  maxWidth = Math.max(maxHeight, tile[0]);
  maxHeight = Math.max(maxHeight, tile[1]);
});

const grid: string[][] = [];

for (let i = 0; i < maxHeight + 1; i++) {
  const arr = new Array();
  arr.length = maxWidth + 1;
  arr.fill('.');
  grid.push(arr);
}

gridInfo.forEach((tile) => {
  grid[tile[1]][tile[0]] = tileTypes[tile[2] as keyof typeof tileTypes];
});

grid.forEach((line) => {
  console.log(line.join(''));
});

let totalBlocks = 0;

grid.forEach((line) => {
  line.forEach((char) => {
    if (char === '#') {
      totalBlocks++;
    }
  });
});

console.log(totalBlocks);
