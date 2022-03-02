import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const lineSegments: { [key: string]: Set<number> } = {};

const drawLines = (line: string[], idx: number) => {
  let currX = 0;
  let currY = 0;

  line.forEach((segment) => {
    const direction = segment[0];
    const distance = +segment.slice(1);

    for (let i = 0; i < distance; i++) {
      if (!lineSegments[`${currX},${currY}`]) {
        lineSegments[`${currX},${currY}`] = new Set();
      }
      lineSegments[`${currX},${currY}`].add(idx);

      if (direction === 'U') {
        currY++;
      }
      if (direction === 'D') {
        currY--;
      }
      if (direction === 'R') {
        currX++;
      }
      if (direction === 'L') {
        currX--;
      }
    }
  });
};

const distanceFromCenter = (center: number[], pos: string) => {
  const coords = pos.split(',').map(Number);

  const [x, y] = coords;

  return Math.abs(x - center[0]) + Math.abs(y - center[1]);
};

inputArr.forEach((line, idx) => {
  drawLines(line, idx);
});

let closestIntersection = Infinity;

Object.keys(lineSegments).forEach((segment) => {
  if (lineSegments[segment].size === 2 && segment !== '0,0') {
    closestIntersection = Math.min(
      closestIntersection,
      distanceFromCenter([0, 0], segment)
    );
  }
});

console.log(closestIntersection);
