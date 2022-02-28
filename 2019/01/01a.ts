import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const getFuel = (mass: number) => {
  return Math.floor(mass / 3) - 2;
};

let total = 0;

inputArr.forEach((mass) => {
  total += getFuel(mass);
});

console.log(total);
