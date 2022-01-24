import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

console.log(inputArr);

const counts: { [key: string]: number } = {};

inputArr.forEach((el) => {
  if (counts[el]) {
    counts[el]++;
  } else {
    counts[el] = 1;
  }
});

console.log(counts);

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

oppositePairs.forEach((pair) => {
  cancelOpposite(pair[0], pair[1]);
});

triangles.forEach((triangle) => {
  cancelInTriangle(triangle[0], triangle[1], triangle[2]);
});

console.log(counts);

const distance = Object.values(counts).reduce((prev, val) => {
  return prev + val;
}, 0);

console.log(distance);
