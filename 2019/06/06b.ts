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

const findOrbitsChain = (planet: string) => {
  const orbitChain = [];

  const planetsWithOrbits = Object.keys(orbits);

  let shouldContinue = true;
  let lookingFor = planet;
  while (true) {
    shouldContinue = false;
    for (let i = 0; i < planetsWithOrbits.length; i++) {
      const possible = planetsWithOrbits[i];

      if (orbits[possible].includes(lookingFor)) {
        orbitChain.push(possible);
        lookingFor = possible;
        shouldContinue = true;
        break;
      }
    }

    if (!shouldContinue) {
      break;
    }
  }

  return orbitChain;
};

const findDistanceBetween = (planet1: string, planet2: string) => {
  const p1OrbitChain = findOrbitsChain(planet1);
  const p2OrbitChain = findOrbitsChain(planet2);

  let firstCommonOrbit = '';

  for (let i = 0; i < p1OrbitChain.length; i++) {
    const planet = p1OrbitChain[i];

    if (p2OrbitChain.includes(planet)) {
      firstCommonOrbit = planet;
      break;
    }
  }

  return (
    p1OrbitChain.indexOf(firstCommonOrbit) +
    p2OrbitChain.indexOf(firstCommonOrbit)
  );
};

console.log(findDistanceBetween('SAN', 'YOU'));
