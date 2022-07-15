import input from './input';

import prepareInput from './helpers/prepareInput';
import getMin from './helpers/getMin';
import getMax from './helpers/getMax';

type coordinate = [string, number, string, number, number];

let inputArr = prepareInput(input);

const minX = getMin(inputArr, 'x');
const minY = getMin(inputArr, 'y');
const spring = 500 - minX;

function reduceArraySize(
  arr: coordinate[],
  minX: number,

  minY: number
) {
  const mapped = arr.map((el) => {
    const mod1 = el[0] === 'x' ? minX : minY;
    const mod2 = mod1 === minX ? minY : minX;

    return [el[0], el[1] - mod1, el[2], el[3] - mod2, el[4] - mod2];
  });

  return mapped as coordinate[];
}

const mapped = reduceArraySize(inputArr, minX, minY);

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

function pourWater(x: number, y: number) {
  map[y][x] = 'x';

  let currentBottom = y;

  while (
    map[currentBottom][x] !== '#' &&
    map[currentBottom][x] !== '~' &&
    currentBottom < map.length - 1
  ) {
    currentBottom++;
  }

  currentBottom--;

  const spillQueue: number[] = [];

  while (currentBottom !== y) {
    map[currentBottom][x] = '|';
    spillQueue.push(currentBottom);
    currentBottom--;
  }

  while (spillQueue.length > 0) {
    const currentLevel = spillQueue.shift()!;

    let left = x - 1;
    let right = x + 1;

    while (
      map[currentLevel][left] !== '#' &&
      map[currentLevel + 1][left] !== '.'
    ) {
      map[currentLevel][left] = '~';
      left--;
      if (left === -1) {
        break;
      }
    }

    while (
      map[currentLevel][right] !== '#' &&
      map[currentLevel + 1][right] !== '.'
    ) {
      map[currentLevel][right] = '~';
      right++;
      if (right >= map[0].length) {
        break;
      }
    }
  }
}

pourWater(spring + 5, 0);

map.forEach((row) => {
  console.log(row.join(' '));
});
