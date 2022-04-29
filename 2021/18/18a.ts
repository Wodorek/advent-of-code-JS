import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

export class SnailNum {
  left: number | SnailNum;
  right: number | SnailNum;
  depth: number;
  prev: SnailNum | null;
  position: 'left' | 'right' | 'root';
  allNodes: (SnailNum | number)[] = [];

  constructor(
    left: number | SnailNum | any[],
    right: number | SnailNum | any[],
    depth: number = 0,
    prev: SnailNum | null = null,
    position: 'left' | 'right' | 'root' = 'root'
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
    const newNum = new SnailNum(this, num);

    const asArr = newNum.turnIntoArr();

    return new SnailNum(asArr[0], asArr[1]);
  }

  reconstructPath(node: SnailNum = this) {
    const path: string[] = [];

    let currNode = node;

    while (currNode.prev !== null) {
      if (currNode.position === 'right') {
        path.unshift('right');
      } else {
        path.unshift('left');
      }
      currNode = currNode.prev;
    }

    return path;
  }

  getCandidate(to: 'explode' | 'split') {
    const queue = [this.left, this.right];
    let candidates: SnailNum[] = [];

    if (to === 'explode') {
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
    } else {
      while (queue.length > 0) {
        const toCheck = queue.shift()!;

        if (toCheck instanceof SnailNum) {
          if (typeof toCheck.left === 'number' && toCheck.left >= 10) {
            candidates.push(toCheck);
          } else if (typeof toCheck.right === 'number' && toCheck.right >= 10) {
            candidates.push(toCheck);
          } else {
            queue.unshift(toCheck.left);
            queue.push(toCheck.right);
          }
        }
      }
    }

    let paths: string[][] = [];

    if (candidates.length === 0) {
      return null;
    }

    candidates.forEach((candidate) => {
      paths.push(candidate.reconstructPath());
    });

    while (candidates.length > 1) {
      const removedIdxs: number[] = [];

      while (
        paths.every((el) => {
          return el[0] === 'right';
        })
      ) {
        paths = paths.map((el) => {
          return el.slice(1);
        });
      }

      candidates.forEach((_, idx) => {
        if (paths[idx][0] === 'right') {
          removedIdxs.push(idx);
        }
      });

      paths = paths.filter((_, idx) => {
        return !removedIdxs.includes(idx);
      });

      paths = paths.map((el) => {
        return el.slice(1);
      });
      candidates = candidates.filter((_, idx) => {
        return !removedIdxs.includes(idx);
      });
    }

    return candidates[0];
  }

  split() {
    const toSplit = this.getCandidate('split');

    if (toSplit === null) {
      return [false, JSON.stringify(this.turnIntoArr())] as [boolean, string];
    }

    let asStr = `${JSON.stringify(this.turnIntoArr())}`;

    if (typeof toSplit.left === 'number' && toSplit.left >= 10) {
      const newLeft = Math.floor(toSplit.left / 2);
      const newRight = Math.ceil(toSplit.left / 2);

      toSplit.left = new SnailNum(newLeft, newRight, 0, toSplit, 'left');
    } else if (typeof toSplit.right === 'number' && toSplit.right >= 10) {
      const newLeft = Math.floor(toSplit.right / 2);
      const newRight = Math.ceil(toSplit.right / 2);

      toSplit.right = new SnailNum(newLeft, newRight, 0, toSplit, 'right');
    }

    return [true, JSON.stringify(this.turnIntoArr())] as [boolean, string];
  }

  explode() {
    const candidate = this.getCandidate('explode');

    if (!candidate) {
      return [false, JSON.stringify(this.turnIntoArr())] as [boolean, string];
    }

    const path = candidate.reconstructPath();
    const accessors = path.map((el) => {
      if (el === 'left') {
        return 0;
      } else {
        return 1;
      }
    });

    let current = accessors.shift()!;

    const arr = this.turnIntoArr();

    let toModify = arr[current];

    for (let i = 0; i < accessors.length - 1; i++) {
      toModify = toModify[accessors[i]];
    }

    toModify[accessors[accessors.length - 1]];

    console.log(arr);

    return [true, ''] as [boolean, string];
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

export function processSnailSum(num1: SnailNum, num2: SnailNum) {
  const operations = [true, true];

  let currStage = num1.add(num2);

  while (operations.some((el) => el)) {
    if (operations[0]) {
      const exploded = currStage.explode();
      const asArr = eval(exploded[1]);
      operations[0] = exploded[0];

      currStage = new SnailNum(asArr[0], asArr[1]);
      operations[1] = true;
      continue;
    }

    if (operations[1]) {
      const split = currStage.split();
      const asArr = eval(split[1]);

      operations[1] = split[0];

      currStage = new SnailNum(asArr[0], asArr[1]);

      if (split[0]) {
        operations[0] = true;
      }
    }
  }

  return currStage;
}

const arr = [
  [3, [2, [1, [7, 3]]]],
  [6, [5, [4, [3, 2]]]],
];

let snailNum = new SnailNum(arr[0], arr[1]);

console.log(JSON.stringify(snailNum.turnIntoArr()));

const exploded = eval(snailNum.explode()[1]);

snailNum = new SnailNum(exploded[0], exploded[1]);
console.log(JSON.stringify(snailNum.turnIntoArr()));
console.log(
  JSON.stringify(snailNum.turnIntoArr()) === '[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]'
);

//THIS

// const arr = [[[[[9, 8], 1], 2], 3], 4];

// const accesses = [0, 0, 0];

// let test = arr[0];
// accesses.forEach((num) => {
//   test = test[num];
// });
// test[1] = 300000;
// console.log(arr);
