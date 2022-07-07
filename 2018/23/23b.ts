import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

function findBoundaries(bots: number[][]) {
  let maxX = -Infinity;
  let maxY = -Infinity;
  let maxZ = -Infinity;
  let minX = Infinity;
  let minY = Infinity;
  let minZ = Infinity;

  bots.forEach((bot) => {
    maxX = Math.max(bot[0], maxX);
    maxY = Math.max(bot[1], maxY);
    maxZ = Math.max(bot[2], maxZ);
    minX = Math.min(bot[0], minX);
    minY = Math.min(bot[1], minY);
    minZ = Math.min(bot[2], minZ);
  });

  return {
    x: {
      min: minX,
      max: maxX,
    },
    y: {
      min: minY,
      max: maxY,
    },
    z: {
      min: minZ,
      max: maxZ,
    },
  };
}

console.log(findBoundaries(inputArr));
