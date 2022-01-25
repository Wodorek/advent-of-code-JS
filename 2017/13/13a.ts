import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const depths: {
  [key: string]: { scannerPos: number; range: number; moving: number };
} = {};

inputArr.forEach((scanner) => {
  depths[scanner[0]] = { scannerPos: 0, range: scanner[1], moving: 1 };
});

const advanceScanner = (idx: number) => {
  const scanner = depths[idx];

  scanner.scannerPos += scanner.moving;
  if (scanner.scannerPos === scanner.range - 1) {
    scanner.moving = -1;
  }

  if (scanner.scannerPos === 0) {
    scanner.moving = 1;
  }
};

const maxDepth = Object.keys(depths)[Object.keys(depths).length - 1];

let totalSeverity = 0;

for (let i = 0; i < +maxDepth + 1; i++) {
  if (depths[i] && depths[i].scannerPos === 0) {
    totalSeverity += i * depths[i].range;
  }

  Object.keys(depths).forEach((scanner) => {
    advanceScanner(+scanner);
  });
}

console.log(totalSeverity);
