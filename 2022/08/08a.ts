import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

function createVisibilityMap(trees: number[][]) {
  const map = trees.map((line) => line.map((e) => (e = 0)));

  for (let i = 0; i < trees.length; i++) {
    let highestH = -1;
    let highestV = -1;

    for (let j = 0; j < trees[i].length; j++) {
      if (trees[i][j] > highestH) {
        map[i][j] = 1;
        highestH = trees[i][j];
      }

      if (trees[j][i] > highestV) {
        map[j][i] = 1;
        highestV = trees[j][i];
      }
    }

    highestH = -1;
    highestV = -1;

    for (let j = trees[i].length - 1; j > 0; j--) {
      if (trees[i][j] > highestH) {
        map[i][j] = 1;
        highestH = trees[i][j];
      }

      if (trees[j][i] > highestV) {
        map[j][i] = 1;
        highestV = trees[j][i];
      }
    }
  }

  return map;
}

const visibilityMap = createVisibilityMap(inputArr);

let totalVisible = 0;

visibilityMap.forEach((row) =>
  row.forEach((tree) => {
    if (tree === 1) {
      totalVisible++;
    }
  })
);

console.log(totalVisible);
