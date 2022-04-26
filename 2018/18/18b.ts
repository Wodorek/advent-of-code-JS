import input from './input';

import prepareInput from './helpers/prepareInput';
import getItemsAround from './helpers/getItemsAround';

const inputArr = prepareInput(input);

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

let area = inputArr;

const values: number[] = [];

values.push(calculateResourceValue(area));

for (let i = 0; i < 1500; i++) {
  area = processArea(area);
  const val = calculateResourceValue(area);
  values.push(val);
}

const valueLookup: { [key: string]: number } = {};

values.forEach((val) => {
  if (valueLookup[val]) {
    valueLookup[val]++;
  } else {
    valueLookup[val] = 1;
  }
});
let found = 0;

for (let v in valueLookup) {
  if (valueLookup[v] > 3) {
    found = +v;
    break;
  }
}

let oscilationStarts = values.indexOf(found);
const oscilationPeriod = Math.abs(
  oscilationStarts -
    values.indexOf(values[oscilationStarts], oscilationStarts + 1)
);

console.log(oscilationPeriod);

let rest = oscilationStarts;

while (rest < 1000000000) {
  rest += oscilationPeriod;
}

// solution
console.log(values[oscilationStarts + oscilationPeriod - (rest - 1000000000)]);
