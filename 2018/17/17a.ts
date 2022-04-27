import input from './input';

import prepareInput from './helpers/prepareInput';
import getMin from './helpers/getMin';
import getMax from './helpers/getMax';

type coordinate = [string, number, string, number, number];

let inputArr = prepareInput(input);

const minX = getMin(inputArr, 'x');
const minY = getMin(inputArr, 'y');
const spring = 500 - minX;

const reduceArraySize = (
  arr: coordinate[],
  minX: number,

  minY: number
) => {
  const mapped = arr.map((el) => {
    const mod1 = el[0] === 'x' ? minX : minY;
    const mod2 = mod1 === minX ? minY : minX;

    return [el[0], el[1] - mod1, el[2], el[3] - mod2, el[4] - mod2];
  });

  return mapped as coordinate[];
};

const mapped = reduceArraySize(inputArr, minX, minY);

const testArr = [
  ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '#', '.', '.', '.', '#', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '#', '.', '.', '.', '#', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '#', '.', '.', '.', '#', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '#', '.', '.', '.', '#', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '#', '#', '#', '#', '#', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
];

/**Mostly for visualization */
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

const map = createMap(mapped);

function pourWater(map: string[][], x: number, y: number) {
  const newMap = map.map((el) => el.map((nel) => nel));

  newMap[y][x] = '+';

  let mod = 1;
  while (true) {
    if (y + mod > newMap.length - 1) {
      break;
    }
    if (newMap[y + mod][x] === '.') {
      newMap[y + mod][x] = '_';
    } else {
      break;
    }
    mod++;
  }

  let wellBottom = y + mod - 1;

  while (true) {
    if (wellBottom <= y) {
      break;
    }

    let left = x;
    let right = x;

    while (newMap[wellBottom][right + 1] !== '#') {}

    wellBottom--;
  }

  newMap.forEach((line) => {
    console.log(line.join(' '));
  });
}

pourWater(testArr, 3, 0);
console.log('');
// pourWater(map, spring - 4, 0);
