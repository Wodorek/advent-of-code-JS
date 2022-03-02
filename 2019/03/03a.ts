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

    if (direction === 'U') {
      for (let i = currY; i <= currY + distance; i++) {
        if (!lineSegments[`${currX},${i}`]) {
          lineSegments[`${currX},${i}`] = new Set();
        }
        lineSegments[`${currX},${i}`].add(idx);
      }
      currY += distance;
    }

    if (direction === 'D') {
      for (let i = currY - distance; i <= currY; i++) {
        if (!lineSegments[`${currX},${i}`]) {
          lineSegments[`${currX},${i}`] = new Set();
        }
        lineSegments[`${currX},${i}`].add(idx);
      }
      currY -= distance;
    }

    if (direction === 'R') {
      for (let i = currX; i <= currX + distance; i++) {
        if (!lineSegments[`${i},${currY}`]) {
          lineSegments[`${i},${currY}`] = new Set();
        }
        lineSegments[`${i},${currY}`].add(idx);
      }
      currX += distance;
    }

    if (direction === 'L') {
      for (let i = currX - distance; i <= currX; i++) {
        if (!lineSegments[`${i},${currY}`]) {
          lineSegments[`${i},${currY}`] = new Set();
        }
        lineSegments[`${i},${currY}`].add(idx);
      }
      currX -= distance;
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
