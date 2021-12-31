import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const position = {
  N: 0,
  E: 0,
};

let facing = 'N';

const turn = (facing: string, side: string) => {
  const directions = ['N', 'E', 'S', 'W'];

  const currentIdx = directions.indexOf(facing);

  if (side === 'R') {
    const newIdx = currentIdx + 1 >= 4 ? 0 : currentIdx + 1;

    return directions[newIdx];
  }

  if (side === 'L') {
    const newIdx = currentIdx - 1 >= 0 ? currentIdx - 1 : 3;

    return directions[newIdx];
  }

  return ')';
};

const move = (steps: number) => {
  if (facing === 'N') {
    position.N += steps;
  }

  if (facing === 'S') {
    position.N -= steps;
  }

  if (facing === 'E') {
    position.E += steps;
  }

  if (facing === 'W') {
    position.E -= steps;
  }
};

inputArr.forEach((el) => {
  const [side, steps] = el;

  facing = turn(facing, side);

  move(steps);
});

console.log(Math.abs(position.N) + Math.abs(position.E));
