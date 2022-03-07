import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const orbits: { [key: string]: string[] } = {};

inputArr.forEach((orbit) => {
  const center = orbit[0];

  if (!orbits[center]) {
    orbits[center] = [];
  }
  orbits[center].push(orbit[1]);
});

let totalOrbits = 0;

let san = 0;
let you = 0;

const countOrbiting = (planet: string, depth: number) => {
  totalOrbits += depth;

  if (planet === 'SAN') {
    san = depth;
  }

  if (planet === 'YOU') {
    you = depth;
  }

  if (orbits[planet]) {
    orbits[planet].forEach((orbit) => {
      countOrbiting(orbit, depth + 1);
    });
  }
};

console.log(orbits);