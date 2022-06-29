import input from './input';
import prepareInput from './helpers/prepareInput';
import { VM } from '../computer/VM';
import neighbors from './helpers/neighbors';

const inputArr = prepareInput(input);

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

      grid[currPosition[0]][currPosition[1]] = 'O';

      station = currPosition;
    }
  });
}

//map out the surroundings
scanFieldsAround(inputArr, droidPosition);
let emptySpaces = 0;

grid.forEach((row) => {
  row.forEach((char) => {
    if (char === ' ') {
      emptySpaces++;
    }
  });
});

const oxygenated: string[] = [`${station[0]},${station[1]}`];

class Oxygenator {
  position: [number, number];

  constructor(position: [number, number]) {
    this.position = position;
  }
}

let currId = 1;
const oxygenators: { [key: string]: Oxygenator } = {};
oxygenators[0] = new Oxygenator(station);

let oxygenLevel = 0;

function oxygenate(oxygenators: { [key: string]: Oxygenator }) {
  Object.keys(oxygenators).forEach((key) => {
    const spacesAround = neighbors(grid, oxygenators[key].position);
    const possibleMoves = spacesAround.filter(
      (el) => !oxygenated.includes(`${el[0]},${el[1]}`)
    );

    if (possibleMoves.length === 0) {
      delete oxygenators[key];
    } else if (possibleMoves.length === 1) {
      oxygenLevel++;
      oxygenators[key].position = possibleMoves[0];
      oxygenated.push(`${possibleMoves[0][0]},${possibleMoves[0][1]}`);
      grid[possibleMoves[0][0]][possibleMoves[0][1]] = 'O';
    } else {
      delete oxygenators[key];
      possibleMoves.forEach((move) => {
        oxygenLevel++;
        oxygenators[currId] = new Oxygenator(move);
        oxygenated.push(`${move[0]},${move[1]}`);
        grid[move[0]][move[1]] = 'O';
        currId++;
      });
    }
  });
}

let time = 0;

while (emptySpaces > oxygenLevel) {
  oxygenate(oxygenators);
  time++;
}

console.log(time);
