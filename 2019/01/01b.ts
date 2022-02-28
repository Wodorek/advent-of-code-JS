import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const getFuel = (mass: number) => {
  return Math.floor(mass / 3) - 2;
};

let total = 0;

const fuelStack = [...inputArr];

while (fuelStack.length > 0) {
  const mass = fuelStack.pop()!;

  const fuel = getFuel(mass);

  if (fuel > 0) {
    total += fuel;
    fuelStack.push(fuel);
  }
}

console.log(total);
