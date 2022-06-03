import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

interface CubeCoords {
  q: number;
  r: number;
  s: number;
}

const movementMap = {
  ne: [1, -1, 0],
  e: [1, 0, -1],
  se: [0, 1, -1],
  sw: [-1, 1, 0],
  w: [-1, 0, 1],
  nw: [0, -1, 1],
};

function parsePath(pathString: string) {
  let parsed = pathString;
  parsed = parsed
    .replaceAll('ne', 'ne,')
    .replaceAll('se', 'se,')
    .replaceAll('sw', 'sw,')
    .replaceAll('nw', 'nw,')
    .replaceAll('e', 'e,')
    .replaceAll('w', 'w,')
    .replaceAll(',,', ',');

  //who needs regex anyway

  return parsed.split(',');
}

function move(position: CubeCoords, move: string[]) {
  move.forEach((step) => {
    const [q, r, s] = movementMap[step as keyof typeof movementMap];

    position.s += s;
    position.q += q;
    position.r += r;
  });

  return position;
}

const paths = inputArr.map((pathString) => {
  return parsePath(pathString).filter((el) => el !== '');
});

const hexes: { [key: string]: boolean } = {};

paths.forEach((path) => {
  const position: CubeCoords = {
    q: 0,
    r: 0,
    s: 0,
  };

  const newPosition = move(position, path);

  const cubeId = `${newPosition.q},${newPosition.r},${newPosition.s}`;

  if (hexes[cubeId]) {
    hexes[cubeId] = !hexes[cubeId];
  } else {
    hexes[cubeId] = true;
  }
});

let totalBlack = 0;

for (const hex in hexes) {
  if (hexes[hex]) {
    totalBlack++;
  }
}

console.log(totalBlack);
