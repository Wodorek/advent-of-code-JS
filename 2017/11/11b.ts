import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

console.log(inputArr);

const counts: { [key: string]: number } = {
  n: 0,
  ne: 0,
  se: 0,
  s: 0,
  sw: 0,
  nw: 0,
};

const oppositePairs = [
  ['n', 's'],
  ['nw', 'se'],
  ['sw', 'ne'],
];

const triangles = [
  ['nw', 'ne', 'n'],
  ['n', 'se', 'ne'],
  ['ne', 's', 'se'],
  ['se', 'sw', 's'],
  ['s', 'nw', 'sw'],
  ['sw', 'n', 'nw'],
];

//cancel out opposite moves
const cancelOpposite = (move1: string, move2: string) => {
  if (counts[move1] > counts[move2]) {
    counts[move1] = counts[move1] - counts[move2];
    counts[move2] = 0;
  } else {
    counts[move2] = counts[move2] - counts[move1];
    counts[move1] = 0;
  }
};

//cancel in triangle
const cancelInTriangle = (move1: string, move2: string, to: string) => {
  if (counts[move1] > counts[move2]) {
    counts[move1] = counts[move1] - counts[move2];
    counts[to] += counts[move2];
    counts[move2] = 0;
  } else {
    counts[move2] = counts[move2] - counts[move1];
    counts[to] += counts[move1];
    counts[move1] = 0;
  }
};

let maxDistance = 0;

inputArr.forEach((el) => {
  counts[el]++;

  oppositePairs.forEach((pair) => {
    cancelOpposite(pair[0], pair[1]);
  });

  triangles.forEach((triangle) => {
    cancelInTriangle(triangle[0], triangle[1], triangle[2]);
  });

  const distance = Object.values(counts).reduce((prev, val) => {
    return prev + val;
  }, 0);

  maxDistance = Math.max(maxDistance, distance);
});

console.log(maxDistance);
