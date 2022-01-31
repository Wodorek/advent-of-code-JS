import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const fabric: string[][] = [];

for (let i = 0; i < 1000; i++) {
  const fabricRow: string[] = [];
  fabricRow.length = 1000;
  fabricRow.fill('.');
  fabric.push(fabricRow);
}

const overlaps = new Set();

inputArr.forEach((el) => {
  const [claimId, [startCol, startRow], [sizeCol, sizeRow]] = el;

  for (let row = startRow; row < startRow + sizeRow; row++) {
    for (let col = startCol; col < startCol + sizeCol; col++) {
      if (fabric[row][col] === '.') {
        fabric[row][col] = `${claimId}`;
      } else {
        overlaps.add(claimId);
        overlaps.add(+fabric[row][col]);
        fabric[row][col] = 'X';
      }
    }
  }
});

const claimIds = inputArr.map((el) => {
  return el[0];
});

const filtered = claimIds.filter((el) => {
  return !overlaps.has(el);
});

console.log(filtered);
