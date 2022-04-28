import input from './input';

import prepareInput from './helpers/prepareInput';
import { type } from 'os';

const inputArr = prepareInput(input);

class SnailNum {
  left: number | SnailNum;
  right: number | SnailNum;
  depth: number;
  prev: SnailNum | null;
  position: 'left' | 'right' | 'root';
  allNodes: (SnailNum | number)[] = [];

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
    this.allNodes = [];
    this.unravel();
    const queue = [this.left, this.right];

    const candidates: SnailNum[] = [];

    while (queue.length > 0) {
      const toCheck = queue.shift()!;

      if (toCheck instanceof SnailNum) {
        if (toCheck.depth >= 4) {
          candidates.push(toCheck);
        } else {
          queue.unshift(toCheck.left);
          queue.push(toCheck.right);
        }
      }
    }

    let toExplode: SnailNum | number = candidates[0];

    const numbersLookup = this.allNodes.filter((el) => {
      return typeof el !== 'number';
    }) as SnailNum[];

    console.log(numbersLookup.indexOf(toExplode));

    let left = numbersLookup.indexOf(toExplode) - 1;
    let right = numbersLookup.indexOf(toExplode) + 1;

    while (left >= 0) {
      if (typeof numbersLookup[left].right === 'number') {
        numbersLookup[left].right += toExplode.left as any;
        break;
      }
      if (typeof numbersLookup[left].left === 'number') {
        numbersLookup[left].left += toExplode.left as any;
        break;
      }
      left--;
    }

    while (right <= numbersLookup.length) {
      if (typeof numbersLookup[right].left === 'number') {
        numbersLookup[right].left += toExplode.right as any;
        break;
      }
      if (typeof numbersLookup[right].right === 'number') {
        numbersLookup[right].right += toExplode.right as any;
        break;
      }
      left--;
    }

    if (toExplode.position === 'left') {
      toExplode!.prev!.left = 0;
    }

    if (toExplode.position === 'right') {
      toExplode!.prev!.right = 0;
    }
  }

  unravel(node: any = this) {
    this.allNodes.push(node);

    if (node.left) {
      this.unravel(node.left);
    }
    if (node.right) {
      this.unravel(node.right);
    }
  }
}

const arr1: any[] = [
  [3, [2, [1, [7, 3]]]],
  [6, [5, [4, [3, 2]]]],
];

const snailNum = new SnailNum(arr1[0], arr1[1], 0, null, 'root');

console.log(`${snailNum.turnIntoArr()}`);

console.log(`${JSON.stringify(snailNum.turnIntoArr())}`);
snailNum.explode();

console.log(`${JSON.stringify(snailNum.turnIntoArr())}`);

console.log(
  `[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]` ===
    `${JSON.stringify(snailNum.turnIntoArr())}`
);
