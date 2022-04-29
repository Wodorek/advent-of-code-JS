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

      paths = paths
        .filter((_, idx) => {
          return !removedIdxs.includes(idx);
        })
        .map((el) => {
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
    this.allNodes = [];
    this.flatten();
    const nodes = this.allNodes.filter((el) => {
      return typeof el !== 'number';
    }) as SnailNum[];
    const candidate = this.getCandidate('explode');

    if (!candidate) {
      return [false, JSON.stringify(this.turnIntoArr())] as [boolean, string];
    }

    const candidateIdx = nodes.indexOf(candidate);

    let leftLookup = candidateIdx - 1;
    let rightLookup = candidateIdx + 1;

    console.log('exploding');
    console.log(JSON.stringify(this.turnIntoArr()));

    while (leftLookup >= 0) {
      const checking = nodes[leftLookup];

      if (typeof checking.right === 'number') {
        checking.right += candidate.left as number;
        break;
      } else if (typeof checking.left === 'number') {
        checking.left += candidate.left as number;
        break;
      }
      leftLookup--;
    }

    while (rightLookup < nodes.length) {
      const checking = nodes[rightLookup];

      if (typeof checking.left === 'number') {
        checking.left += candidate.right as number;
        break;
      } else if (typeof checking.right === 'number') {
        checking.right += candidate.right as number;
        break;
      }

      rightLookup++;
    }

    if (candidate.position === 'left') {
      candidate.prev!.left = 0;
    } else {
      candidate.prev!.right = 0;
    }

    console.log('product');
    console.log(JSON.stringify(this.turnIntoArr()));
    console.log('');

    return [true, JSON.stringify(this.turnIntoArr())] as [boolean, string];
  }

  flatten(node: any = this) {
    if (typeof node.left !== 'number') {
      this.flatten(node.left);
    }

    this.allNodes.push(node);

    if (typeof node.right !== 'number') {
      this.flatten(node.right);
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

// const arr1 = [
//   [
//     [
//       [7, 0],
//       [7, 7],
//     ],
//     [
//       [7, 7],
//       [7, 8],
//     ],
//   ],
//   [
//     [
//       [7, 7],
//       [8, 8],
//     ],
//     [
//       [7, 7],
//       [8, 7],
//     ],
//   ],
// ];

// const arr2 = [
//   7,
//   [
//     5,
//     [
//       [3, 8],
//       [1, 4],
//     ],
//   ],
// ];

// let num1 = new SnailNum(arr1[0], arr1[1]);
// const num2 = new SnailNum(arr2[0], arr2[1]);

// num1 = processSnailSum(num1, num2);

// console.log(JSON.stringify(num1.turnIntoArr()));
// console.log(
//   JSON.stringify(num1.turnIntoArr()) ===
//     '[[[[7,7],[7,8]],[[9,5],[8,7]]],[[[6,8],[0,8]],[[9,9],[9,0]]]]'
// );

// ('[[[[7,7],[7,8]],[[9,5],[8,7]]],[[[6,8],[0,8]],[[9,9],[9,0]]]]');
// ('[[[[7,7],[7,8]],[[9,5],[8,7]]],[[[7,8],[0,8]],[[8,9],[9,0]]]]');
