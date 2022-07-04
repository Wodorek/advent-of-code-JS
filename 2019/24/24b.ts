import input from './input';

import prepareInput from './helpers/prepareInput';
import bugsAroundRecursive from './helpers/bugsAroundRecursive';

const inputArr = prepareInput(input);

let slices: string[][][] = [];

for (let i = 0; i < 410; i++) {
  const slice: string[][] = new Array();

  for (let j = 0; j < 5; j++) {
    const row: string[] = [];
    row.length = 5;
    row.fill('.');
    slice.push(row);
  }
  slices.push(slice);
}

const middle = Math.floor(slices.length / 2);
slices[middle] = inputArr;

for (let i = 0; i < 200; i++) {
  slices = slices.map((slice, sId) => {
    return slice.map((row, x) => {
      return row.map((char, y) => {
        const bugsAround = bugsAroundRecursive(slices, [sId, x, y]);

        if (x === 2 && y === 2) {
          return '.';
        }

        if (char === '#') {
          if (bugsAround === 1) {
            return '#';
          } else {
            return '.';
          }
        } else {
          if (bugsAround === 1 || bugsAround === 2) {
            return '#';
          } else {
            return '.';
          }
        }
      });
    });
  });
}

let totalBugs = 0;

slices.forEach((slice) => {
  slice.forEach((row) => {
    row.forEach((char) => {
      if (char === '#') totalBugs++;
    });
  });
});

console.log(totalBugs);
