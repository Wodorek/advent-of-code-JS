import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const position = {
  N: 0,
  E: 0,
};

let facing = 'N';

const visited: string[] = [];

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
  let changing: 'N' | 'E' = 'N';
  let direction = 1;

  if (facing === 'N') {
    changing = 'N';
    direction = 1;
  }

  if (facing === 'S') {
    changing = 'N';
    direction = -1;
  }

  if (facing === 'E') {
    changing = 'E';
    direction = 1;
  }

  if (facing === 'W') {
    changing = 'E';
    direction = -1;
  }

  for (let i = 0; i < steps; i++) {
    const location = `${position.N},${position.E}`;

    if (visited.includes(location)) {
      console.log(Math.abs(position.N) + Math.abs(position.E));
    }

    visited.push(location);
    position[changing] += 1 * direction;
  }
};

inputArr.forEach((el) => {
  const [side, steps] = el;

  facing = turn(facing, side);

  move(steps);
});

console.log(visited);
