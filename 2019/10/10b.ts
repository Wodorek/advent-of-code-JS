import input from './input';
import prepareInput from './helpers/prepareInput';
import getGCD from './helpers/getGCD';
import sortFromPoint from './helpers/sortFromPoint';
import sortClockwise from './helpers/sortClockwise';

const inputArr = prepareInput(input);

function findAllAsteroids(field: string[][]) {
  const asteroids: [number, number][] = [];

  for (let y = 0; y < field.length; y++) {
    const row = field[y];

    for (let x = 0; x < row.length; x++) {
      const space = row[x];

      if (space === '#') {
        asteroids.push([x, y]);
      }
    }
  }

  return asteroids;
}

const asteroids = findAllAsteroids(inputArr);

/** Same x axis is considered top, same y axis is considered left */
function divideIntoQuadrants(asteroids: number[][], point: [number, number]) {
  const quadrants: {
    top: {
      left: number[][];
      right: number[][];
    };
    bottom: {
      left: number[][];
      right: number[][];
    };
  } = {
    top: {
      left: [],
      right: [],
    },
    bottom: {
      left: [],
      right: [],
    },
  };

  asteroids.forEach((asteroid) => {
    if (asteroid[1] <= point[1]) {
      if (asteroid[0] >= point[0]) {
        quadrants.top.right.push(asteroid);
      } else {
        quadrants.top.left.push(asteroid);
      }
    } else {
      if (asteroid[0] >= point[0]) {
        quadrants.bottom.right.push(asteroid);
      } else {
        quadrants.bottom.left.push(asteroid);
      }
    }
  });

  return quadrants;
}

function getVisibleInQuadrant(
  quadrant: number[][],
  from: number[],
  quadId: string
) {
  const steps: number[][] = [];

  const visibleFromPoint: number[][] = [];

  quadrant.forEach((asteroid) => {
    let isVisible = true;

    steps.forEach((step) => {
      const deltas = [step[0], step[1]];

      while (true) {
        if (
          asteroid[0] + deltas[0] === from[0] &&
          asteroid[1] + deltas[1] === from[1]
        ) {
          isVisible = false;
          break;
        }

        if (quadId === 'tl') {
          if (
            deltas[0] + asteroid[0] > from[0] ||
            deltas[1] + asteroid[1] > from[1]
          ) {
            break;
          }
        } else if (quadId === 'tr') {
          if (
            deltas[0] + asteroid[0] < from[0] ||
            deltas[1] + asteroid[1] > from[1]
          ) {
            break;
          }
        } else if (quadId === 'bl') {
          if (
            deltas[0] + asteroid[0] > from[0] ||
            deltas[1] + asteroid[1] < from[1]
          ) {
            break;
          }
        } else if (quadId === 'br') {
          if (
            deltas[0] + asteroid[0] < from[0] ||
            deltas[1] + asteroid[1] < from[1]
          ) {
            break;
          }
        }
        deltas[0] += step[0];
        deltas[1] += step[1];
      }
    });

    if (isVisible) {
      visibleFromPoint.push(asteroid);

      const xDelta = from[0] - asteroid[0];
      const yDelta = from[1] - asteroid[1];

      const GCD = getGCD(xDelta, yDelta);
      steps.push([xDelta / GCD, yDelta / GCD]);
    }
  });

  return visibleFromPoint;
}

function countVisibleAsteroids(asteroids: number[][], from: [number, number]) {
  const filteredAsteroids = sortFromPoint(asteroids, from).filter((el) => {
    return el[0] !== from[0] || el[1] !== from[1];
  });

  const quadrants = divideIntoQuadrants(filteredAsteroids, from);

  const testQuad = [
    quadrants.top.right,
    quadrants.bottom.right,
    quadrants.bottom.left,
    quadrants.top.left,
  ];
  const ids = ['tr', 'br', 'bl', 'tl'];

  const allVisible: number[][] = [];

  testQuad.forEach((quad, idx) => {
    allVisible.push(...getVisibleInQuadrant(quad, from, ids[idx]));
  });

  return allVisible;
}

const foundAsteroids = countVisibleAsteroids(asteroids, [8, 3]);
const sorted = sortClockwise(
  foundAsteroids.map((el) => {
    return [el[0] - 8, el[1] - 3];
  }),
  [0, 0]
).map((el) => {
  return [el[0] + 8, el[1] + 3];
});
