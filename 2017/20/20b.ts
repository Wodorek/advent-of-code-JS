import input from './input';

import prepareInput from './helpers/prepareInput';

//[p [num,num,num], v[num,num,num], a[num,num,num]][]
const inputArr = prepareInput(input);

console.log(inputArr.length);

const moveParticle = (idx: number, arr: number[][][]) => {
  const newParticle = JSON.parse(JSON.stringify(arr[idx]));

  newParticle[1][0] += newParticle[2][0];
  newParticle[1][1] += newParticle[2][1];
  newParticle[1][2] += newParticle[2][2];

  newParticle[0][0] += newParticle[1][0];
  newParticle[0][1] += newParticle[1][1];
  newParticle[0][2] += newParticle[1][2];

  return newParticle;
};

const checkCollisions = (arr: number[][][]) => {
  let left = 0;
  let right = 1;

  const collisionIdxs: number[] = [];
  while (left < arr.length - 2) {
    if (
      arr[left][0][0] === arr[right][0][0] &&
      arr[left][0][1] === arr[right][0][1] &&
      arr[left][0][2] === arr[right][0][2]
    ) {
      collisionIdxs.push(left);
      collisionIdxs.push(right);
    }

    right++;

    if (right === arr.length - 1) {
      left++;
      right = left + 1;
    }
  }

  return collisionIdxs;
};

console.log(checkCollisions(inputArr));

let currentPositions = inputArr;

let timesWithoutCollision = 0;

while (timesWithoutCollision < 100) {
  currentPositions = currentPositions.map((el, idx) => {
    return moveParticle(idx, currentPositions);
  });

  const collisions = checkCollisions(currentPositions);

  if (collisions.length === 0) {
    timesWithoutCollision++;
    continue;
  } else {
    timesWithoutCollision = 0;
    currentPositions = currentPositions.filter((el, idx) => {
      return !collisions.includes(idx);
    });
  }
}

console.log(currentPositions.length);
