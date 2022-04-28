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
    const newNum = new SnailNum(this, num, 0, null, 'root');

    const asArr = newNum.turnIntoArr();

    return new SnailNum(asArr[0], asArr[1], 0, null, 'root');
  }

  getCandidates() {
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

    return candidates;
  }

  split() {
    const queue = [this.left, this.right];

    const candidates: SnailNum[] = [];

    while (queue.length > 0) {
      const toCheck = queue.shift()!;

      if (toCheck instanceof SnailNum) {
        if (typeof toCheck.left === 'number' && toCheck.left >= 10) {
          candidates.push(toCheck);
        } else if (typeof toCheck.right === 'number' && toCheck.right > 10) {
          candidates.push(toCheck);
        } else {
          queue.unshift(toCheck.left);
          queue.push(toCheck.right);
        }
      }
    }

    if (candidates.length === 0) {
      return [false, JSON.stringify(this.turnIntoArr())] as [boolean, string];
    }

    const toSplit = candidates[0];

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

    const candidates = this.getCandidates();

    if (candidates.length === 0) {
      return [false, JSON.stringify(this.turnIntoArr())] as [boolean, string];
    }

    let toExplode: SnailNum | number = candidates[0];
    const rightVal = toExplode.right as number;
    const leftVal = toExplode.left as number;

    const expIdx = this.allNodes.indexOf(toExplode);

    const lookingFor = `${toExplode.left},${toExplode.right}`;
    const replaceLen = lookingFor.length;

    let asStr = `${JSON.stringify(this.turnIntoArr())}`;

    let replaceIdx = asStr.indexOf(lookingFor, expIdx);

    let left = replaceIdx - 1;
    let right = replaceIdx + replaceLen;

    let lmod = 0;
    let rmod = 0;
    while (left > 0) {
      const asArr = asStr.split('');

      const checking = asArr[left];

      if (!isNaN(+checking)) {
        asArr[left] = `${+asArr[left] + leftVal}`;

        if (`${+asArr[left]}`.length > 1) {
          lmod++;
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
        asArr[right] = `${+asArr[right] + rightVal}`;

        if (`${+asArr[right]}`.length > 1) {
          rmod++;

          replaceIdx++;
        }
        asStr = asArr.join('');
        break;
      }

      right++;
    }

    const leftPart = asStr.slice(0, replaceIdx - 1 - lmod);
    const rightPart = asStr.slice(replaceIdx + replaceLen - rmod + 1);

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
      console.log(exploded[1]);
      const asArr = eval(exploded[1]);
      operations[0] = exploded[0];

      currStage = new SnailNum(asArr[0], asArr[1], 0, null, 'root');
      continue;
    }

    if (operations[1]) {
      const split = currStage.split();
      const asArr = eval(split[1]);

      operations[1] = split[0];

      currStage = new SnailNum(asArr[0], asArr[1], 0, null, 'root');

      if (split[1]) {
        operations[0] = true;
      }
    }
  }

  return currStage;
}
