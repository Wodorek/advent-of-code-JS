import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

function findScenicScore(x: number, y: number) {
  let scores = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  };

  const treeHeight = inputArr[y][x];

  const top = y - 1;
  const bottom = y + 1;
  const left = x - 1;
  const right = x + 1;

  //look right
  for (let i = right; i < inputArr[0].length; i++) {
    if (inputArr[y][i] >= treeHeight) {
      scores.right = i - x;
      break;
    }
  }

  if (!scores.right) {
    scores.right = inputArr.length - 1 - x;
  }

  //look left
  for (let i = left; i >= 0; i--) {
    if (inputArr[y][i] >= treeHeight) {
      scores.left = x - i;
      break;
    }
  }

  if (!scores.left) {
    scores.left = x;
  }

  //look up
  for (let i = top; i >= 0; i--) {
    if (inputArr[i][x] >= treeHeight) {
      scores.top = y - i;
      break;
    }
  }

  if (!scores.top) {
    scores.top = y;
  }

  //look down
  for (let i = bottom; i < inputArr.length; i++) {
    if (inputArr[i][x] >= treeHeight) {
      scores.bottom = i - y;
      break;
    }
  }

  if (!scores.bottom) {
    scores.bottom = inputArr.length - 1 - y;
  }

  return Object.values(scores).reduce((prev, val) => {
    return prev * val;
  }, 1);
}

const scores: number[] = [];

inputArr.forEach((row, x) => {
  row.forEach((tree, y) => {
    scores.push(findScenicScore(x, y));
  });
});

console.log(Math.max(...scores));
