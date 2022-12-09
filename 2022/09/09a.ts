import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const moves = {
  D: { x: 0, y: -1 },
  U: { x: 0, y: 1 },
  R: { x: 1, y: 0 },
  L: { x: -1, y: 0 },
};

class Rope {
  head = {
    x: 1,
    y: 0,
  };

  tail = {
    x: 0,
    y: 1,
  };

  areTouching() {
    const dx = Math.abs(this.head.x - this.tail.x);
    const dy = Math.abs(this.head.y - this.head.y);

    let touching = false;

    if (dy === 0 && dx === 1) {
      touching = true;
    }

    if (dx === 0 && dy === 1) {
      touching = true;
    }

    if (dx === 1 && dy === 1) {
      touching = true;
    }

    console.log(touching);
    return touching;
  }

  moveHead(direction: keyof typeof moves) {}
  moveTail() {
    const touching = this.areTouching();

    if (touching) {
      return;
    }
  }
}

const rope = new Rope();

rope.areTouching();
