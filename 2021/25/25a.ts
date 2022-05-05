import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

function moveCucumbers(map: string[][]) {
  const newMap = map.map((el) => el.map((e) => e));

  map.forEach((line, y) => {
    line.forEach((spot, x) => {
      if (spot === '>') {
        if (x === line.length - 1) {
          if (line[0] === '.') {
            newMap[y][x] = '.';
            newMap[y][0] = '>';
          }
        } else {
          if (line[x + 1] === '.') {
            newMap[y][x] = '.';
            newMap[y][x + 1] = '>';
          }
        }
      }
    });
  });

  const finalMap = newMap.map((el) => el.map((e) => e));

  newMap.forEach((line, y) => {
    line.forEach((spot, x) => {
      if (spot === 'v') {
        if (y === newMap.length - 1) {
          if (newMap[0][x] === '.') {
            finalMap[0][x] = 'v';
            finalMap[y][x] = '.';
          }
        } else {
          if (newMap[y + 1][x] === '.') {
            finalMap[y + 1][x] = 'v';
            finalMap[y][x] = '.';
          }
        }
      }
    });
  });

  return finalMap;
}

let pastMap: string[][] = [];
let currMap = inputArr;

let solution = 0;

while (true) {
  if (JSON.stringify(pastMap) === JSON.stringify(currMap)) {
    break;
  }
  pastMap = currMap;
  currMap = moveCucumbers(currMap);
  solution++;
}

console.log(solution);
