import input from './input';

import prepareInput from './helpers/prepareInput';
import { VM } from '../computer/VM';
import neighbors from './helpers/neighbors';
import bfs from './helpers/bfs';

const inputArr = prepareInput(input);

const vm = new VM(inputArr);

const grid: string[][] = [];

for (let i = 0; i < 50; i++) {
  const row = new Array();
  row.length = 50;
  row.fill('|');
  grid.push(row);
}

const droidPosition: [number, number] = [
  Math.floor(grid.length / 2),
  Math.floor(grid[0].length / 2),
];

const directions = [1, 2, 3, 4];
const directionsMap = {
  1: [-1, 0],
  2: [1, 0],
  3: [0, -1],
  4: [0, 1],
};

grid.forEach((row) => {
  console.log(row.join(''));
});

console.log(' ');

const visitedPositions: string[] = [];

let station: [number, number] = [0, 0];

function scanFieldsAround(droidMem: number[], position: [number, number]) {
  const positionId = `${position[0]},${position[1]}`;

  if (
    position[0] > grid.length ||
    position[0] <= 0 ||
    position[1] > grid[0].length ||
    position[1] <= 0 ||
    visitedPositions.includes(positionId)
  ) {
    return;
  }

  visitedPositions.push(positionId);

  directions.forEach((direction) => {
    const vm = new VM(droidMem);

    const currPosition = position.map((el) => el) as [number, number];

    let lastOutput = undefined;

    while (lastOutput === undefined) {
      vm.executeInstruction(direction);
      lastOutput = vm.getLastOutput;
    }

    if (lastOutput === 1) {
      currPosition[0] +=
        directionsMap[direction as keyof typeof directionsMap][0];
      currPosition[1] +=
        directionsMap[direction as keyof typeof directionsMap][1];

      grid[currPosition[0]][currPosition[1]] = ' ';
      scanFieldsAround(vm.getCurrentMemory, currPosition);
    } else if (lastOutput === 2) {
      currPosition[0] +=
        directionsMap[direction as keyof typeof directionsMap][0];
      currPosition[1] +=
        directionsMap[direction as keyof typeof directionsMap][1];

      station = currPosition;

      grid[currPosition[0]][currPosition[1]] = 'X';
    }
  });
}

//map out the surroundings
scanFieldsAround(inputArr, droidPosition);

grid[droidPosition[0]][droidPosition[1]] = 'S';

console.log(grid[9][41]);

grid.forEach((row) => {
  console.log(row.join(''));
});

console.log(bfs(grid, droidPosition, station));
