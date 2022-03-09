import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input)[0];

class SnailNum {
  left: number | SnailNum;
  right: number | SnailNum;
  depth: number;
  constructor(
    left: number | SnailNum | any[],
    right: number | SnailNum | any[],
    depth: number
  ) {
    if (typeof left === 'number' || left instanceof SnailNum) {
      this.left = left;
    } else {
      this.left = new SnailNum(left[0], left[1], depth + 1);
    }

    if (typeof right === 'number' || right instanceof SnailNum) {
      this.right = right;
    } else {
      this.right = new SnailNum(right[0], right[1], depth + 1);
    }

    this.depth = depth;
  }

  add(num: SnailNum) {
    const newNum = new SnailNum(this, num, 0);

    const asArr = newNum.turnIntoArr();

    return new SnailNum(asArr[0], asArr[1], 0);
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

  findFirsExploding() {
    const queue = [this.left, this.right];

    const exploding: string[] = [];

    while (queue.length > 0) {
      const item = queue.pop()!;

      if (item instanceof SnailNum) {
        if (item.depth === 4) {
          exploding.push(`${item.left},${item.right}`);
        } else {
          queue.push(item.left, item.right);
        }
      }
    }

    const asStr = JSON.stringify(this.turnIntoArr());

    return Math.min(
      ...exploding.map((el) => {
        return asStr.indexOf(`[${el}]`);
      })
    );
  }

  explode() {
    let idx = this.findFirsExploding();

    if (idx === Infinity) {
      return [this, false] as [SnailNum, boolean];
    }

    let asStr = JSON.stringify(this.turnIntoArr());

    const exp = asStr.slice(idx + 1, idx + 4);

    const split = exp.split(',');
    const [left, right] = split;

    let leftIdx = idx - 1;
    let rightIdx = idx + 5;

    while (asStr[leftIdx]) {
      if (!isNaN(+asStr[leftIdx])) {
        const replacement = +asStr[leftIdx] + +left;
        idx += `${replacement}`.length - 1;
        const temp = asStr.split('');
        temp[leftIdx] = `${replacement}`;

        asStr = temp.join('');

        break;
      }
      leftIdx--;
    }

    while (asStr[rightIdx]) {
      if (!isNaN(+asStr[rightIdx])) {
        const replacement = +asStr[rightIdx] + +right;

        const temp = asStr.split('');
        temp[rightIdx] = `${replacement}`;

        asStr = temp.join('');

        break;
      }
      rightIdx++;
    }

    asStr = asStr.substring(0, idx) + '0' + asStr.substring(idx + 5);

    return [new SnailNum(eval(asStr)[0], eval(asStr)[1], 0), true] as [
      SnailNum,
      boolean
    ];
  }

  split() {
    const asArr = JSON.stringify(this.turnIntoArr()).split('');

    let idx = 0;

    let hasSplit = false;

    while (idx < asArr.length - 2) {
      if (isNaN(+asArr[idx])) {
        idx++;
      } else {
        if (!isNaN(+asArr[idx + 1])) {
          const num = +asArr.slice(idx, idx + 2).join('');
          asArr.splice(
            idx,
            2,
            ...`[${Math.floor(num / 2)},${Math.ceil(num / 2)}]`
          );
          hasSplit = true;
          break;
        } else {
          idx++;
        }
      }
    }

    return [
      new SnailNum(eval(asArr.join(''))[0], eval(asArr.join(''))[1], 0),
      hasSplit,
    ] as [SnailNum, boolean];
  }
}

const arr1 = [
  [[[4, 3], 4], 4],
  [7, [[8, 4], 9]],
];

let snail = new SnailNum(arr1[0], arr1[1], 0);
snail = snail.add(new SnailNum([1, 1][0], [1, 1][1], 0));
snail = snail.explode()[0];
snail = snail.explode()[0];
snail = snail.split()[0];
snail = snail.split()[0];
snail = snail.explode()[0];

console.log(
  JSON.stringify(snail.turnIntoArr()) === '[[[[0,7],4],[[7,8],[6,0]]],[8,1]]'
);
