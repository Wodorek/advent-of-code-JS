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

      if (
        (row === 0 && column === 0) ||
        (row === 0 && column === currentRow.length - 1) ||
        (row === lightGrid.length - 1 && column === 0) ||
        (row === lightGrid.length - 1 && column === currentRow.length - 1)
      ) {
        newRow = newRow.concat('#');
      } else {
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
    }
    newGrid.push(newRow);
  }

  return newGrid;
};

let currentGrid = inputArr;

//turn on the "always on" corner lights to start with
currentGrid = currentGrid.map((el, idx) => {
  if (idx === 0 || idx === currentGrid.length - 1) {
    const splitLine = el.split('');
    splitLine[0] = '#';
    splitLine[splitLine.length - 1] = '#';

    const joined = splitLine.join('');
    return joined;
  } else {
    return el;
  }
});

for (let index = 0; index < 100; index++) {
  currentGrid = processLights(currentGrid);
}

console.log(countLights(currentGrid));
