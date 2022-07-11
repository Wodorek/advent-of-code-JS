import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

function isInRange(form: number[], to: number[]) {
  let totalDistance = 0;

  form.forEach((coord, idx) => {
    const distanceOnAxis = Math.abs(coord - to[idx]);
    totalDistance += distanceOnAxis;
  });

  return totalDistance <= 3 ? true : false;
}

function extractConstellation(arr: number[][]) {
  const points = arr.map((el) => el);

  const currentConstellation = [points.pop()!];

  let foundStars = true;

  while (foundStars) {
    foundStars = false;

    for (let i = 0; i < points.length; i++) {
      const check = points[i];

      for (let j = 0; j < currentConstellation.length; j++) {
        if (isInRange(check, currentConstellation[j])) {
          currentConstellation.push(...points.splice(i, 1));
          i++;
          foundStars = true;
          break;
        }
      }
    }
  }

  return [currentConstellation, points];
}

let points = inputArr.map((el) => el);
let constellations: number[][][] = [];
while (points.length > 0) {
  const [constellation, newPoints] = extractConstellation(points);

  constellations.push(constellation);
  points = newPoints;
}

console.log(constellations.length);
