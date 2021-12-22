import input from './input';
import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

console.log(inputArr);

const cubes: { [key: string]: number } = {};

const bounds = [-50, 50];

for (let i = 0; i < inputArr.length; i++) {
  const coords = inputArr[i][1];
  const directive = inputArr[i][0];

  for (let x = coords[0][0]; x < coords[0][1] + 1; x++) {
    if (coords[0][0] < bounds[0] || coords[0][1] > bounds[1]) {
      continue;
    }

    for (let y = coords[1][0]; y < coords[1][1] + 1; y++) {
      if (coords[1][0] < bounds[0] || coords[1][1] > bounds[1]) {
        continue;
      }

      for (let z = coords[2][0]; z < coords[2][1] + 1; z++) {
        if (coords[2][0] < bounds[0] || coords[2][1] > bounds[1]) {
          continue;
        }

        const key = `${x},${y},${z}`;

        cubes[key] = directive;
      }
    }
  }
}

const keys = Object.keys(cubes);

let count = 0;

keys.forEach((key) => {
  if (cubes[key] === 1) {
    count++;
  }
});

console.log(count);
