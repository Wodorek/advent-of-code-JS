import input from './input';
import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const cubes: { [key: string]: number } = {};

for (let i = 0; i < inputArr.length; i++) {
  const coords = inputArr[i][1];
  const directive = inputArr[i][0];

  for (let x = coords[0][0]; x < coords[0][1] + 1; x++) {
    for (let y = coords[1][0]; y < coords[1][1] + 1; y++) {
      for (let z = coords[2][0]; z < coords[2][1] + 1; z++) {
        cubes[`${x},${y},${z}`] = directive;
      }
    }
  }
}

const keys = Object.keys(cubes);

let count = 0;

console.log('you will never see it');

keys.forEach((key) => {
  if (cubes[key] === 1) {
    count++;
  }
});

console.log(count);
