import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

class SnailNum {
  left: number | SnailNum;
  right: number | SnailNum;
  depth: number;
  prev: SnailNum | null;
  position: 'left' | 'right' | 'root';

  constructor(
    left: number | SnailNum | any[],
    right: number | SnailNum | any[],
    depth: number,
    prev: SnailNum | null,
    position: 'left' | 'right' | 'root'
  ) {
    if (typeof left === 'number' || left instanceof SnailNum) {
      this.left = left;
    } else {
      this.left = new SnailNum(left[0], left[1], depth + 1, this, 'left');
    }

    if (typeof right === 'number' || right instanceof SnailNum) {
      this.right = right;
    } else {
      this.right = new SnailNum(right[0], right[1], depth + 1, this, 'right');
    }

    this.depth = depth;
    this.prev = prev;
    this.position = position;
  }

  turnIntoArr(): any[] {
    const arr: any[] = [];

    arr.push(this.left, this.right);

    const mapped = arr.map((el) => {
      if (el instanceof SnailNum) {
        return el.turnIntoArr();
      } else {
        return el;
      }
    });

    return mapped;
  }

  add(num: SnailNum) {
    const newNum = new SnailNum(this, num, 0, null, 'root');

    const asArr = newNum.turnIntoArr();

    return new SnailNum(asArr[0], asArr[1], 0, null, 'root');
  }

  explode() {
    const queue = [this.left, this.right];

    const candidates: SnailNum[] = [];

    while (queue.length > 0) {
      const toCheck = queue.pop()!;

      if (toCheck instanceof SnailNum) {
        if (toCheck.depth >= 4) {
          candidates.push(toCheck);
        } else {
          queue.push(toCheck.left, toCheck.right);
        }
      }
    }

    let toExplode: SnailNum | number = candidates[candidates.length - 1];

    console.log(toExplode.prev);

    let left = toExplode.left;
    let right = toExplode.right;

    let rightLookup = toExplode.prev;
    let leftLookup = toExplode.prev;

    while (true) {
      if (typeof rightLookup?.right === 'number') {
        rightLookup.right += right as number;
        break;
      } else if (rightLookup?.prev === null) {
        break;
      } else {
        rightLookup = rightLookup!.prev;
      }
    }

    while (true) {
      if (typeof leftLookup?.left === 'number') {
        leftLookup.left += left as number;
        break;
      } else if (leftLookup?.prev === null) {
        break;
      } else {
        leftLookup = leftLookup!.prev;
      }
    }

    if (toExplode.position === 'left') {
      toExplode!.prev!.left = 0;
    }

    if (toExplode.position === 'right') {
      toExplode!.prev!.right = 0;
    }
  }
}

const arr1: any[] = [
  [3, [2, [1, [7, 3]]]],
  [6, [5, [4, [3, 2]]]],
];

const snailNum = new SnailNum(arr1[0], arr1[1], 0, null, 'root');

console.log(`${JSON.stringify(snailNum.turnIntoArr())}`);

snailNum.explode();

console.log(`${JSON.stringify(snailNum.turnIntoArr())}`);

console.log(
  `[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]` ===
    `${JSON.stringify(snailNum.turnIntoArr())}`
);
// `[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]`

[
  [3, [2, [1, [7, 3]]]],
  [6, [5, [4, [3, 2]]]],
];
