import input from './input';

import prepareInput from './helpers/prepareInput';
import getMin from './helpers/getMin';
import getMax from './helpers/getMax';

type coordinate = [string, number, string, number, number];

let inputArr = prepareInput(input);

const createMap = (coordinates: coordinate[]) => {
  const maxX = getMax(coordinates, 'x');
  const maxY = getMax(coordinates, 'y');

  const map: string[][] = [];

  for (let i = 0; i < maxY + 1; i++) {
    const row = new Array(maxX + 1).fill('.');

    map.push(row);
  }

  coordinates.forEach((coord) => {
    const point = coord[0];

    for (let i = coord[3]; i < coord[4] + 1; i++) {
      if (point === 'x') {
        map[i][coord[1]] = '#';
      } else {
        map[coord[1]][i] = '#';
      }
    }
  });

  return map;
};

function hasWall(map: string[][], x: number, y: number, direction: 1 | -1) {
  let col = x;

  while (true) {
    if (map[y][col] === '.') {
      return false;
    }
    if (map[y][col] === '#') {
      return true;
    }

    col += direction;
  }
}

function isContainer(map: string[][], x: number, y: number) {
  return hasWall(map, x, y, 1) && hasWall(map, x, y, -1);
}

function flowToSide(map: string[][], x: number, y: number, direction: 1 | -1) {
  let col = x;

  while (true) {
    if (map[y][col] === '#') {
      return;
    }
    map[y][col] = '~';
    col += direction;
  }
}

function spreadWater(map: string[][], x: number, y: number) {
  flowToSide(map, x, y, 1);
  flowToSide(map, x, y, -1);
}

function pourWater(
  map: string[][],
  x: number,
  y: number,
  self: typeof pourWater
) {
  if (y >= maxY) {
    return;
  }

  if (map[y + 1][x] === '.') {
    map[y + 1][x] = '|';
    pourWater(map, x, y + 1, self);
  }

  if (
    (map[y + 1][x] === '#' || map[y + 1][x] === '~') &&
    map[y][x - 1] === '.'
  ) {
    map[y][x - 1] = '|';
    pourWater(map, x - 1, y, self);
  }

  if (
    (map[y + 1][x] === '#' || map[y + 1][x] === '~') &&
    map[y][x + 1] === '.'
  ) {
    map[y][x + 1] = '|';
    pourWater(map, x + 1, y, self);
  }

  if (isContainer(map, x, y)) {
    spreadWater(map, x, y);
  }
}

const map = createMap(inputArr);
const maxY = getMax(inputArr, 'y');

pourWater(map, 500, 0, pourWater);

let totalWater = 0;

map.forEach((row) => {
  row.forEach((char) => {
    if (char === '|' || char === '~') {
      totalWater++;
    }
  });
});
console.log(totalWater);
