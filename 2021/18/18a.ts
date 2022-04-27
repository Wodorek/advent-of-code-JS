import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

class SnailNum {
  left: number | SnailNum;
  right: number | SnailNum;
  depth: number;
  prev: SnailNum | null;

  constructor(
    left: number | SnailNum | any[],
    right: number | SnailNum | any[],
    depth: number,
    prev: SnailNum | null
  ) {
    if (typeof left === 'number' || left instanceof SnailNum) {
      this.left = left;
    } else {
      this.left = new SnailNum(left[0], left[1], depth + 1, this);
    }

    if (typeof right === 'number' || right instanceof SnailNum) {
      this.right = right;
    } else {
      this.right = new SnailNum(right[0], right[1], depth + 1, this);
    }

    this.depth = depth;
    this.prev = prev;
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
    const newNum = new SnailNum(this, num, 0, null);

    const asArr = newNum.turnIntoArr();

    return new SnailNum(asArr[0], asArr[1], 0, null);
  }

  explode() {
    const queue = [this.left, this.right];

    const candidates = [];

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

    console.log(candidates);
  }
}

const arr1 = [[[[[9, 8], 1], 2], 3], 4];

const snailNum = new SnailNum(arr1[0], arr1[1], 0, null);

snailNum.explode();
