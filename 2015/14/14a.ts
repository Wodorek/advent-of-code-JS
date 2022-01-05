import input from './input';

import prepareInput from './helpers/prepareInput';

interface reindeer {
  name: string;
  position: number;
  speed: number;
  movesFor: number;
  movesLeft: number;
  restsFor: number;
  restsLeft: number;
}

//[name, speed, movesFor, restsFor]
const inputArr = prepareInput(input);

let reindeers: reindeer[] = [];

inputArr.forEach((reindeer) => {
  reindeers.push({
    name: reindeer[0],
    position: 0,
    speed: reindeer[1],
    movesFor: reindeer[2],
    movesLeft: reindeer[2],
    restsFor: reindeer[3],
    restsLeft: 0,
  });
});

const moveReindeer = (reindeer: reindeer) => {
  if (reindeer.restsLeft > 0) {
    reindeer.restsLeft--;
    return reindeer;
  }

  if (reindeer.movesLeft === 0) {
    reindeer.movesLeft = reindeer.movesFor;
    reindeer.restsLeft = reindeer.restsFor - 1;
    return reindeer;
  }

  reindeer.position += reindeer.speed;
  reindeer.movesLeft--;

  return reindeer;
};

for (let index = 0; index < 2503; index++) {
  reindeers = reindeers.map((reindeer) => {
    return moveReindeer(reindeer);
  });
}

let maxPosition = 0;

reindeers.forEach((reindeer) => {
  maxPosition = Math.max(maxPosition, reindeer.position);
});

console.log(maxPosition);
