import input from './input';

import prepareInput from './helpers/prepareInput';
import bugsAround from './helpers/bugsAround';

const inputArr = prepareInput(input);

function killBugs(grid: string[][]) {
  const newGrid = grid.map((row, x) => {
    return row.map((char, y) => {
      const foundBugs = bugsAround(grid, [x, y]);

      if (char === '#') {
        if (foundBugs === 1) {
          return '#';
        } else {
          return '.';
        }
      } else {
        if (foundBugs === 1 || foundBugs === 2) {
          return '#';
        } else {
          return '.';
        }
      }
    });
  });

  return newGrid;
}

function getBiodiversity(grid: string[][]) {
  let totalScore = 0;

  grid.forEach((row, x) => {
    row.forEach((char, y) => {
      if (char === '#') {
        totalScore += Math.pow(2, grid[0].length * x + y);
      }
    });
  });

  return totalScore;
}

const memory: string[] = [];

let repeated = false;

let grid = inputArr;

memory.push(grid.flat().join(''));

while (!repeated) {
  grid = killBugs(grid);

  const flat = grid.flat().join('');

  if (memory.includes(flat)) {
    repeated = true;
  } else {
    memory.push(flat);
  }
}

grid.forEach((row) => {
  console.log(row.join(''));
});

console.log(getBiodiversity(grid));
