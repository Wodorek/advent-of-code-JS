import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

interface Position {
  e: number;
  ne: number;
}

function parseIntoMoves(line: string) {
  const regexes = {
    se: new RegExp('se', 'g'),
    ne: new RegExp('ne', 'g'),
    sw: new RegExp('sw', 'g'),
    nw: new RegExp('nw', 'g'),
    e: new RegExp('e', 'g'),
    w: new RegExp('w', 'g'),
  };

  const regexKeys = Object.keys(regexes);

  const moves: { [key: string]: number } = {};

  regexKeys.forEach((key) => {
    const matches = line.match(regexes[key as keyof typeof regexes]);

    moves[key] = matches?.length ? matches.length : 0;
  });

  moves['e'] = moves['e'] - moves['se'] - moves['ne'];
  moves['w'] = moves['w'] - moves['sw'] - moves['nw'];

  return moves;
}

function move(moves: { [key: string]: number }) {}

// true === black
const tilePositions: { [key: string]: boolean } = {};

inputArr.forEach((line) => {
  const moves = parseIntoMoves(line);

  const currPosition: Position = {
    e: 0,
    ne: 0,
  };

  Object.keys(moves).forEach((key) => {
    if (key === 'ne') {
      currPosition['ne'] += moves[key];
    } else if (key === 'e') {
      currPosition['e'] += moves[key];
    } else if (key === 'se') {
      currPosition['ne'] -= moves[key];
      currPosition['e'] += moves[key];
    } else if (key === 'sw') {
      currPosition['ne'] -= moves[key];
    } else if (key === 'w') {
      currPosition['e'] -= moves[key];
    } else if (key === 'nw') {
      currPosition['ne'] += moves[key];
      currPosition['e'] -= moves[key];
    }
  });

  const tileId = `${currPosition['e']},${currPosition['ne']}`;

  if (tilePositions[tileId]) {
    tilePositions[tileId] = !tilePositions[tileId];
  } else {
    tilePositions[tileId] = true;
  }
});

let totalBlack = 0;

Object.keys(tilePositions).forEach((tile) => {
  if (tilePositions[tile]) {
    totalBlack++;
  }
});

console.log(totalBlack);
