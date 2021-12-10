import input from './input';
import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const neighbours = (map: number[][], row: number, col: number) => {
  const result = [];
  if (row > 0) {
    result.push([row - 1, col]);
  }
  if (row < map.length - 1) {
    result.push([row + 1, col]);
  }
  if (col > 0) {
    result.push([row, col - 1]);
  }
  if (col < map[row].length - 1) {
    result.push([row, col + 1]);
  }
  return result as [number, number][];
};

const basins = [];
for (let i = 0; i < inputArr.length; ++i) {
  for (let j = 0; j < inputArr[i].length; ++j) {
    if (inputArr[i][j] >= 9) {
      continue;
    }
    const queue = [[i, j]];

    //marks already visited number
    inputArr[i][j] = 10;
    let size = 1;
    while (queue.length > 0) {
      const [x, y] = queue.pop()!;
      for (const [r, c] of neighbours(inputArr, x, y)) {
        if (inputArr[r][c] < 9) {
          queue.push([r, c]);
          inputArr[r][c] = 10;
          size++;
        }
      }
    }
    basins.push(size);
  }
}

const sortedBasins = basins.sort((a: number, b: number) => {
  return a > b ? -1 : 1;
});

const result = sortedBasins[0] * sortedBasins[1] * sortedBasins[2];

console.log(result);
