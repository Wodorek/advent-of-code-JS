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

    console.log(candidates);
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

    // console.log(toSplit);

    if (toSplit === null) {
      return [false, JSON.stringify(this.turnIntoArr())] as [boolean, string];
    }

    let asStr = `${JSON.stringify(this.turnIntoArr())}`;

    console.log(`Splitting `);
    console.log(asStr);

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
    this.unravel();

    let toExplode = this.getCandidate('explode');

    if (toExplode === null) {
      return [false, JSON.stringify(this.turnIntoArr())] as [boolean, string];
    }

    const rightVal = toExplode.right as number;
    const leftVal = toExplode.left as number;

    const expIdx = this.allNodes.indexOf(toExplode);

    const lookingFor = `${toExplode.left},${toExplode.right}`;

    const replaceLen = lookingFor.length;

    let asStr = `${JSON.stringify(this.turnIntoArr())}`;

    let replaceIdx = asStr.indexOf(lookingFor, expIdx);
    console.log(
      `Exp looking for ${lookingFor}, from ${expIdx}, found at ${replaceIdx}`
    );
    console.log(asStr);

    let left = replaceIdx - 1;
    let right = replaceIdx + replaceLen + 1;

    while (left > 0) {
      const asArr = asStr.split('');

      const checking = asArr[left];

      if (!isNaN(+checking)) {
        if (!isNaN(+asArr[left - 1])) {
          asArr[left - 1] = `${
            parseInt(asArr.slice(left - 1, left + 1).join('')) + leftVal
          }`;
          asArr[left] = '';
        } else {
          asArr[left] = `${+asArr[left] + leftVal}`;
        }

        if (`${+asArr[left]}`.length > 1) {
          right++;
          replaceIdx++;
        }
        asStr = asArr.join('');
        break;
      }

      left--;
    }

    while (right < asStr.length) {
      const asArr = asStr.split('');

      const checking = asArr[right];

      if (!isNaN(+checking)) {
        if (!isNaN(+asArr[right + 1])) {
          asArr[right] = `${
            parseInt(asArr.slice(right, right + 2).join('')) + rightVal
          }`;
          asArr[right + 1] = '';
        } else {
          asArr[right] = `${+asArr[right] + rightVal}`;
        }
        asStr = asArr.join('');
        break;
      }
      right++;
    }

    const leftPart = asStr.slice(0, replaceIdx - 1);
    const rightPart = asStr.slice(replaceIdx + replaceLen + 1);

    const newStr = leftPart + '0' + rightPart;

    return [true, newStr] as [boolean, string];
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

// const problem = [
//   [
//     [
//       [6, 0],
//       [7, 7],
//     ],
//     [
//       [7, 7],
//       [0, 7],
//     ],
//   ],
//   [
//     [
//       [7, 7],
//       [7, 7],
//     ],
//     [
//       [8, 8],
//       [9, 9],
//     ],
//   ],
// ];

// const problemNum = new SnailNum(problem[0], problem[1]);
// console.log(JSON.stringify(problemNum.turnIntoArr()));

// const exploded = problemNum.explode();

// console.log(exploded);

// let problem = [
//   [
//     [
//       [6, 7],
//       [6, 7],
//     ],
//     [
//       [7, 7],
//       [0, 7],
//     ],
//   ],
//   [
//     [
//       [8, 7],
//       [7, 7],
//     ],
//     [
//       [8, 8],
//       [8, 0],
//     ],
//   ],
// ];
// const toAdd = [
//   [
//     [[2, 4], 7],
//     [6, [0, 5]],
//   ],
//   [
//     [
//       [6, 8],
//       [2, 8],
//     ],
//     [
//       [2, 1],
//       [4, 5],
//     ],
//   ],
// ];

// let num1 = new SnailNum(problem[0], problem[1]);
// let num2 = new SnailNum(toAdd[0], toAdd[1]);

// num1 = processSnailSum(num1, num2);

// console.log(JSON.stringify(num1.turnIntoArr()));
// console.log(
//   JSON.stringify(num1.turnIntoArr()) ==
//     '[[[[7,0],[7,7]],[[7,7],[7,8]]],[[[7,7],[8,8]],[[7,7],[8,7]]]]'
// );
// ('[[[[7,0],[7,7]],[[7,7],[7,8]]],[[[7,7],[8,8]],[[7,7],[8,7]]]]');
// ('[[[[6,0],[7,7]],[[7,7],[0,7]]],[[[7,7],[7,7]],[[8,8],[9,9]]]]');
