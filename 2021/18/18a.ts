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

  getExplodeCandidate() {
    const stack = [this.right, this.left];
    while (stack.length > 0) {
      const toCheck = stack.pop()!;

      if (toCheck instanceof SnailNum) {
        if (toCheck.depth >= 4) {
          return toCheck;
        } else {
          stack.push(toCheck.right);
          stack.push(toCheck.left);
        }
      }
    }
    return null;
  }

  getSplitCandidate() {
    const stack = [this.right, this.left];
    while (stack.length > 0) {
      const toCheck = stack.pop()!;

      if (toCheck instanceof SnailNum) {
        stack.push(toCheck.right);
        stack.push(toCheck.left);
      } else if (toCheck >= 10) {
        return toCheck;
      }
    }
    return null;
  }

  split() {
    const toSplit = this.getSplitCandidate();

    if (toSplit === null) {
      return [false, JSON.stringify(this.turnIntoArr())] as [boolean, string];
    }

    let asStr = `${JSON.stringify(this.turnIntoArr())}`;

    const newLeft = Math.floor(toSplit / 2);
    const newRight = Math.ceil(toSplit / 2);
    const repl = `[${newLeft},${newRight}]`;

    return [true, asStr.replace(toSplit.toString(), repl)] as [boolean, string];
  }

  explode() {
    this.allNodes = [];
    this.flatten();
    const nodes = this.allNodes.filter((el) => {
      return typeof el !== 'number';
    }) as SnailNum[];
    const candidate = this.getExplodeCandidate();

    if (!candidate) {
      return [false, JSON.stringify(this.turnIntoArr())] as [boolean, string];
    }

    const candidateIdx = nodes.indexOf(candidate);

    let leftLookup = candidateIdx - 1;
    let rightLookup = candidateIdx + 1;

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

  getMagnitude(arr: any) {
    const [left, right] = arr;
    const leftValue: any = Array.isArray(left) ? this.getMagnitude(left) : left;
    const rightValue: any = Array.isArray(right)
      ? this.getMagnitude(right)
      : right;
    return 3 * leftValue + 2 * rightValue;
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

let num1 = new SnailNum(inputArr[0][0], inputArr[0][1]);

const queue = [...inputArr.slice(1)];

while (queue.length > 0) {
  const toProcess = queue.shift();
  const toAdd = new SnailNum(toProcess[0], toProcess[1]);

  num1 = processSnailSum(num1, toAdd);
}
console.log(num1.getMagnitude(num1.turnIntoArr()));
