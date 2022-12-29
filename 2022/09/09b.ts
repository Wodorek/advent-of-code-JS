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
  next: IKnot | null;
}

class Rope {
  tail: IKnot = {
    x: 0,
    y: 0,
    next: null,
  };
  knot1: IKnot = {
    x: 0,
    y: 0,
    next: this.tail,
  };
  knot2: IKnot = {
    x: 0,
    y: 0,
    next: this.knot1,
  };
  knot3: IKnot = {
    x: 0,
    y: 0,
    next: this.knot2,
  };
  knot4: IKnot = {
    x: 0,
    y: 0,
    next: this.knot3,
  };
  knot5: IKnot = {
    x: 0,
    y: 0,
    next: this.knot4,
  };
  knot6: IKnot = {
    x: 0,
    y: 0,
    next: this.knot5,
  };
  knot7: IKnot = {
    x: 0,
    y: 0,
    next: this.knot6,
  };
  knot8: IKnot = {
    x: 0,
    y: 0,
    next: this.knot7,
  };

  head: IKnot = {
    x: 0,
    y: 0,
    next: this.knot8,
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

  processMove(headMoves: { dir: string; steps: number }) {
    const { steps } = headMoves;
    const dir = headMoves.dir as keyof typeof moves;

    for (let i = 0; i < steps; i++) {
      this.move(this.head, dir);

      let currentKnot = this.head;

      while (currentKnot.next) {
        const nextMove = this.findNextMove(currentKnot, currentKnot.next);

        this.move(currentKnot.next, nextMove);

        currentKnot = currentKnot.next;
      }

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

  rope.processMove({ dir, steps });
});

console.log(rope.tailPositions.size);
