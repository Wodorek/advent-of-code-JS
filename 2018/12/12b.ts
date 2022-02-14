import input from './input';

import prepareInput from './helpers/prepareInput';

const [initialState, lookup] = prepareInput(input);

let startIdx = 0;

console.log(initialState);

const producePlants = (pots: string) => {
  const expanded = '..' + pots + '..';

  startIdx += 2;

  let newPots = '';

  for (let i = 0; i < expanded.length; i++) {
    const slice = expanded.slice(i - 2, i + 3);

    if (lookup[slice]) {
      newPots = newPots.concat(lookup[slice]);
    } else {
      newPots = newPots.concat('.');
    }
  }

  return newPots;
};

let pots = initialState;

const count = (pots: string, offset: number) => {
  let sum = 0;

  pots.split('').forEach((pot, idx) => {
    if (pot === '#') {
      sum += idx - offset;
    }
  });

  return sum;
};

let previous = 0;
let repeated = 0;
let iterations = 0;
let sumSoFar = 0;

let check: number[] = [];

while (true) {
  pots = producePlants(pots);
  const counted = count(pots, startIdx);

  iterations++;
  sumSoFar = counted;

  if (
    check.length === 3 &&
    check.every((el) => {
      return el === check[0];
    })
  ) {
    repeated = check[0];
    break;
  } else {
    check.push(counted - previous);
    previous = counted;

    if (check.length > 3) {
      check.shift();
    }
  }
}

console.log(sumSoFar + (50000000000 - iterations) * repeated);
