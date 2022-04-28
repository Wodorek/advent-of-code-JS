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
    this.allNodes = [];
    this.unravel();

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
    const rightVal = toExplode.right as number;
    const leftVal = toExplode.left as number;

    console.log(leftVal);

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
        console.log(asArr[left]);
        asArr[left] = `${+asArr[left] + leftVal}`;

        if (`${+asArr[left]}`.length > 1) {
          right++;
          lmod++;
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
        }
        asStr = asArr.join('');
        break;
      }

      right++;
    }

    const leftPart = asStr.slice(0, replaceIdx - 1 - lmod);
    const rightPart = asStr.slice(replaceIdx + replaceLen - rmod + 1);

    const newStr = leftPart + '0' + rightPart;

    return newStr;
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

const arr1: any[] = [[[[[9, 8], 1], 2], 3], 4];

const snailNum = new SnailNum(arr1[0], arr1[1], 0, null, 'root');

// console.log(`${snailNum.turnIntoArr()}`);

// console.log(`${JSON.stringify(snailNum.turnIntoArr())}`);
console.log(snailNum.explode());

// console.log(`${JSON.stringify(snailNum.turnIntoArr())}`);

// console.log(
//   `[7,[6,[5,[7,0]]]]` === `${JSON.stringify(snailNum.turnIntoArr())}`
// );
