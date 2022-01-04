import input from './input';

import prepareInput from './helpers/prepareInput';
import permute from './helpers/permute';

const inputArr = prepareInput(input);

const allLocations: string[] = [];
const flightPaths: { [key: string]: number } = {};

inputArr.forEach((flight) => {
  if (!allLocations.includes(flight[0])) {
    allLocations.push(flight[0]);
  }

  if (!allLocations.includes(flight[1])) {
    allLocations.push(flight[1]);
  }

  if (!flightPaths[`${flight[0]},${flight[1]}`]) {
    flightPaths[`${flight[0]},${flight[1]}`] = flight[2];
  }

  if (!flightPaths[`${flight[1]},${flight[0]}`]) {
    flightPaths[`${flight[1]},${flight[0]}`] = flight[2];
  }
});

const possibleRoutes = permute(allLocations);

const travelTimes: number[] = [];

for (let i = 0; i < possibleRoutes.length; i++) {
  const route = possibleRoutes[i];

  let canFly = true;

  let totalTime = 0;

  for (let j = 0; j < route.length - 1; j++) {
    const from = route[j];
    const to = route[j + 1];

    const path = `${from},${to}`;

    canFly = Object.keys(flightPaths).includes(path);

    totalTime += flightPaths[`${from},${to}`];
  }

  if (canFly) {
    travelTimes.push(totalTime);
  }
}

console.log(Math.min(...travelTimes));
