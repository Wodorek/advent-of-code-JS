import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const moves = {
  STOP: { x: 0, y: 0 },
  D: { x: 0, y: 1 },
  U: { x: 0, y: -1 },
  R: { x: 1, y: 0 },
  L: { x: -1, y: 0 },
  DR: { x: 1, y: 1 },
  DL: { x: -1, y: 1 },
  UL: { x: -1, y: -1 },
  UR: { x: 1, y: -1 },
};

interface IKnot {
  x: number;
  y: number;
}

class Rope {
  head: IKnot = {
    x: 0,
    y: 0,
  };
  tail: IKnot = {
    x: 0,
    y: 0,
  };

  tailPositions = new Set<string>();

  findNextMove(leader: IKnot, follower: IKnot): keyof typeof moves {
    const dx = leader.x - follower.x;
    const dy = leader.y - follower.y;

    if (Math.abs(dx) === 1 && Math.abs(dy) === 1) {
      return 'STOP';
    }

    if (dx === 0) {
      if (dy > 1) {
        return 'D';
      } else if (dy < -1) {
        return 'U';
      } else {
        return 'STOP';
      }
    }

    if (dy === 0) {
      if (dx > 1) {
        return 'R';
      } else if (dx < -1) {
        return 'L';
      } else {
        return 'STOP';
      }
    }

    if (dx > 0) {
      if (dy > 0) {
        return 'DR';
      } else {
        return 'UR';
      }
    }

    if (dx < 0) {
      if (dy > 0) {
        return 'DL';
      } else {
        return 'UL';
      }
    }

    return 'STOP';
  }

  processMove(
    leader: IKnot,
    follower: IKnot,
    leaderMoves: { dir: string; steps: number }
  ) {
    const { steps } = leaderMoves;
    const dir = leaderMoves.dir as keyof typeof moves;

    for (let i = 0; i < steps; i++) {
      leader.x += moves[dir].x;
      leader.y += moves[dir].y;

      const nextMove = this.findNextMove(leader, follower);

      follower.x += moves[nextMove].x;
      follower.y += moves[nextMove].y;

      this.tailPositions.add(`${this.tail.x},${this.tail.y}`);
    }
  }

  move(knot: IKnot, dir: keyof typeof moves) {
    knot.x += moves[dir].x;
    knot.y += moves[dir].y;
  }
}

const rope = new Rope();

inputArr.forEach((directive) => {
  const [dir, steps] = directive;

  rope.processMove(rope.head, rope.tail, { dir, steps });
});

console.log(rope.tailPositions.size);
