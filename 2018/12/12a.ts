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

for (let i = 0; i < 20; i++) {
  pots = producePlants(pots);
}

const count = (pots: string, offset: number) => {
  let sum = 0;

  pots.split('').forEach((pot, idx) => {
    if (pot === '#') {
      sum += idx - offset;
    }
  });

  return sum;
};

console.log(count(pots, startIdx));
