import getFishPopulation from './getFishPopulation';
import input from './input';
import prepareInput from './prepareInput';

const prepared = prepareInput(input);

const timers: { [key: number]: number } = {
  0: 0,
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
  9: 0,
};

//prepare initial state
prepared.forEach((el) => {
  timers[el] += 1;
});

for (let i = 0; i < 256; i++) {
  timers[9] = timers[0];
  timers[7] += timers[0];
  timers[0] = 0;

  for (let j = 0; j < 9; j++) {
    timers[j] = timers[j + 1];
    timers[j + 1] = 0;
  }
}

console.log(getFishPopulation(timers));
