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

const groundSlice = createMap(mapped);

const pourWater = (arr: string[][], x: number, y: number) => {
  groundSlice.forEach((el) => {
    console.log(el.join(' '));
  });
  let bottom = y;

  while (arr[bottom][x] !== '#') {
    arr[bottom][x] = '|';

    bottom++;
    if (bottom === arr.length) {
      return;
    }
  }

  bottom--;

  let left = x;
  let right = x;

  let stop = false;

  const overflow = [0, 0];
  let filled = 0;

  for (let i = bottom - y; i >= 0; i--) {
    if (stop) {
      break;
    }
    left = x;
    right = x;
    while (arr[y + i][left] !== '#' && arr[y + i + 1][left - 1] !== '.') {
      arr[y + i][left] = '~';
      left--;
      if (arr[y + i][left] !== '#' && arr[y + i + 1][left - 1] === '.') {
        stop = true;
      }
    }

    while (
      arr[y + i][right] &&
      arr[y + i][right] !== '#' &&
      arr[y + i + 1][right + 1] !== '.'
    ) {
      arr[y + i][right] = '~';
      right++;
      if (arr[y + i][right] !== '#' && arr[y + i + 1][right + 1] === '.') {
        stop = true;
      }
    }
    filled++;
  }

  if (arr[bottom - filled + 1][left] === '.') {
    overflow[0] = 1;
  }

  if (arr[bottom - filled + 1][right] === '.') {
    overflow[1] = 1;
  }

  if (overflow[0] === 0 && overflow[1] === 0) {
    pourWater(arr, x, y - 1);
  }

  if (overflow[1] === 1) {
    arr[bottom - filled + 1][right] = '~';
    pourWater(arr, right + 1, bottom - filled + 1);
  }

  if (overflow[0] === 1) {
    arr[bottom - filled + 1][left] = '~';
    pourWater(arr, left - 1, bottom - filled + 1);
  }
};

pourWater(groundSlice, 500 - minX, 0);

groundSlice.forEach((el) => {
  console.log(el.join(' '));
});

let total = 0;

groundSlice.forEach((line) => {
  line.forEach((el) => {
    if (el === '|' || el === '~') {
      total++;
    }
  });
});

console.log(total);
