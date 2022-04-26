import input from './input';

import prepareInput from './helpers/prepareInput';
import getItemsAround from './helpers/getItemsAround';

const inputArr = prepareInput(input);

inputArr.forEach((line) => {
  console.log(line.join(''));
});

function processAcre(area: string[][], row: number, column: number) {
  const acre = area[column][row];
  const around = getItemsAround(area, row, column);

  let trees = 0;
  let empty = 0;
  let yards = 0;

  around.forEach((item) => {
    if (item === '.') {
      empty++;
    }

    if (item === '|') {
      trees++;
    }

    if (item === '#') {
      yards++;
    }
  });

  if (acre === '.') {
    if (trees >= 3) {
      return '|';
    } else {
      return acre;
    }
  }

  if (acre === '|') {
    if (yards >= 3) {
      return '#';
    } else {
      return acre;
    }
  }

  if (acre === '#') {
    if (yards > 0 && trees > 0) {
      return acre;
    } else {
      return '.';
    }
  }

  return acre;
}

function processArea(area: string[][]) {
  const newArea: string[][] = [];

  for (let i = 0; i < area.length; i++) {
    const column = area[i];

    const newRow: string[] = [];

    for (let j = 0; j < column.length; j++) {
      newRow.push(processAcre(area, j, i));
    }

    newArea.push(newRow);
  }

  return newArea;
}

let area = inputArr;

for (let i = 0; i < 10; i++) {
  area = processArea(area);
}

console.log(calculateResourceValue(area));

function calculateResourceValue(area: string[][]) {
  let wooded = 0;
  let yards = 0;

  area.forEach((line) => {
    line.forEach((acre) => {
      if (acre === '#') {
        yards++;
      }
      if (acre === '|') {
        wooded++;
      }
    });
  });

  return wooded * yards;
}
