import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

console.log(inputArr[0]);

const fabric: string[][] = [];

for (let i = 0; i < 1000; i++) {
  const fabricRow: string[] = [];
  fabricRow.length = 1000;
  fabricRow.fill('.');
  fabric.push(fabricRow);
}

inputArr.forEach((el) => {
  const [_, [startCol, startRow], [sizeCol, sizeRow]] = el;

  for (let row = startRow; row < startRow + sizeRow; row++) {
    for (let col = startCol; col < startCol + sizeCol; col++) {
      if (fabric[row][col] === '.') {
        fabric[row][col] = '#';
      } else {
        fabric[row][col] = 'X';
      }
    }
  }
});

let totalOverlap = 0;

fabric.forEach((line) => {
  line.forEach((el) => {
    if (el === 'X') {
      totalOverlap++;
    }
  });
});

console.log(totalOverlap);
