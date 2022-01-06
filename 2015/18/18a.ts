import input from './input';

import prepareInput from './helpers/prepareInput';
import countOnNeighbors from './helpers/countOnNeighbors';
import printout from './helpers/printout';
import countLights from './helpers/countLights';

const inputArr = prepareInput(input);

const processLights = (lightGrid: string[]) => {
  let newGrid: string[] = [];

  for (let row = 0; row < lightGrid.length; row++) {
    const currentRow = lightGrid[row];

    let newRow: string = '';

    for (let column = 0; column < currentRow.length; column++) {
      const light = currentRow[column];

      const neighborsOn = countOnNeighbors(lightGrid, row, column);

      if (light === '.') {
        if (neighborsOn === 3) {
          newRow = newRow.concat('#');
        } else {
          newRow = newRow.concat('.');
        }
      }

      if (light === '#') {
        if (neighborsOn === 2 || neighborsOn === 3) {
          newRow = newRow.concat('#');
        } else {
          newRow = newRow.concat('.');
        }
      }
    }
    newGrid.push(newRow);
  }

  return newGrid;
};

let currentGrid = inputArr;

for (let index = 0; index < 100; index++) {
  currentGrid = processLights(currentGrid);
}

console.log(countLights(currentGrid));
