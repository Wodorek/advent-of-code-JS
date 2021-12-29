import input from './input';
import prepareInput from './helpers/prepareInput';
import checkNeighbors from './helpers/checkNeighbors';
import compareCycles from './helpers/compareCycles';
import countOccupied from './helpers/countOccupied';

const inputArr = prepareInput(input);

const seatPassangers = (arr: string[]) => {
  const newLayout = [];
  for (let row = 0; row < arr.length; row++) {
    const currRow = arr[row];
    let newRow = '';

    for (let col = 0; col < currRow.length; col++) {
      const seat = currRow[col];

      if (seat === '.') {
        newRow = newRow.concat('.');
      }

      if (seat === 'L') {
        if (checkNeighbors(arr, row, col) === 0) {
          newRow = newRow.concat('#');
        } else {
          newRow = newRow.concat(seat);
        }
      }

      if (seat === '#') {
        if (checkNeighbors(arr, row, col) > 4) {
          newRow = newRow.concat('L');
        } else {
          newRow = newRow.concat(seat);
        }
      }
    }
    newLayout.push(newRow);
  }
  return newLayout;
};

let changesStopped = false;

let cycle1 = inputArr;
let cycle2 = seatPassangers(cycle1);

while (!changesStopped) {
  cycle1 = cycle2;
  cycle2 = seatPassangers(cycle1);

  changesStopped = compareCycles(cycle1, cycle2);
}

countOccupied(cycle2);
