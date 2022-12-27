import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const moves = {
  STOP: { x: 0, y: 0 },
  D: { x: 0, y: -1 },
  U: { x: 0, y: 1 },
  R: { x: 1, y: 0 },
  L: { x: -1, y: 0 },
  DR: { x: 1, y: -1 },
  DL: { x: 1, y: 1 },
  UL: { x: -1, y: -1 },
  UR: { x: -1, y: 1 },
};

const opposites = {
  STOP: 'STOP',
  D: 'U',
  U: 'D',
  L: 'R',
  R: 'L',
  UR: 'DL',
  DL: 'UR',
  UL: 'DR',
  DR: 'UL',
};

interface IKnot {
  x: number;
  y: number;
}

class Rope {
  head: IKnot = {
    x: 2,
    y: 1,
  };
  tail: IKnot = {
    x: 0,
    y: 0,
  };

  nextMove(leader: IKnot, follower: IKnot): keyof typeof moves {
    const dx = leader.x - follower.x;
    const dy = leader.y - follower.y;

    console.table({ dx, dy });

    return 'STOP';
  }

  move(knot: IKnot, dir: keyof typeof moves) {
    knot.x += moves[dir].x;
    knot.y += moves[dir].y;
  }
}

const rope = new Rope();

rope.nextMove(rope.head, rope.tail);

const knotMap: string[][] = [];

for (let i = 0; i < 10; i++) {
  knotMap.push(['.', '.', '.', '.', '.', '.', '.', '.', '.', '.']);
}

const { x: hx, y: hy } = rope.head;
const { x: tx, y: ty } = rope.tail;

knotMap[hy][hx] = 'H';
knotMap[ty][tx] = 'T';

knotMap.forEach((line) => {
  console.log(line.join(' '));
});
