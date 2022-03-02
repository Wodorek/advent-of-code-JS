import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const lineSegments: {
  [key: string]: { cross: Set<number>; stepsTaken: { [key: string]: number } };
} = {};

const drawLines = (line: string[], idx: number) => {
  let currX = 0;
  let currY = 0;
  let stepsTaken = 0;

  line.forEach((segment) => {
    const direction = segment[0];
    const distance = +segment.slice(1);

    for (let i = 0; i < distance; i++) {
      if (!lineSegments[`${currX},${currY}`]) {
        lineSegments[`${currX},${currY}`] = {
          cross: new Set(),
          stepsTaken: { 0: 0, 1: 0 },
        };
      }
      lineSegments[`${currX},${currY}`].cross.add(idx);
      lineSegments[`${currX},${currY}`].stepsTaken[idx] = stepsTaken;
      stepsTaken++;
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

inputArr.forEach((line, idx) => {
  drawLines(line, idx);
});

let closestIntersection = Infinity;

Object.keys(lineSegments).forEach((segment) => {
  if (lineSegments[segment].cross.size === 2 && segment !== '0,0') {
    closestIntersection = Math.min(
      closestIntersection,
      lineSegments[segment].stepsTaken[0] + lineSegments[segment].stepsTaken[1]
    );
  }
});

console.log(closestIntersection);
