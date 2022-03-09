import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

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

    console.log('beofre,', asStr);

    let mod = 1;
    let exp = asStr.slice(idx + 1, idx + 4);
    while (exp[exp.length - 1] === ',') {
      exp = asStr.slice(idx + 1, idx + 4 + mod);
      mod++;
    }

    const split = exp.split(',');
    const [left, right] = split;

    let leftIdx = idx - 1;
    let rightIdx = idx + 6;

    let endMod = 0;
    while (asStr[leftIdx]) {
      if (!isNaN(+asStr[leftIdx])) {
        const replacement = +asStr[leftIdx] + +left;

        if (replacement > 10) {
          endMod++;
        }

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
        let replacement = 0;
        const temp = asStr.split('');

        if (!isNaN(+asStr[rightIdx + 1])) {
          replacement = +asStr.slice(rightIdx, rightIdx + 2) + +right;
          temp[rightIdx + 1] = '';
        } else {
          replacement = +asStr[rightIdx] + +right;
        }

        temp[rightIdx] = `${replacement}`;

        asStr = temp.join('');

        break;
      }
      rightIdx++;
    }

    asStr = asStr.substring(0, idx) + '0' + asStr.substring(idx + 5 + endMod);
    const splitAgain = asStr.split('');

    let probe = 0;

    while (probe < splitAgain.length - 1) {
      if (splitAgain[probe] === '0') {
        if (splitAgain[probe + 1] !== ',' && splitAgain[probe + 1] !== ']') {
          splitAgain.splice(probe + 1, 0, ',');
        }
      }
      probe++;
    }

    asStr = splitAgain.join('');

    console.log(asStr);

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

    console.log('spl', asArr.join(''));

    return [
      new SnailNum(eval(asArr.join(''))[0], eval(asArr.join(''))[1], 0),
      hasSplit,
    ] as [SnailNum, boolean];
  }
}

const processAdding = (root: SnailNum, toAdd: SnailNum) => {
  let summed = root.add(toAdd);

  //[0] has exploded, [1] has split
  const processes = [true, true];

  while (
    processes.some((el) => {
      return el === true;
    })
  ) {
    while (processes[0] === true) {
      [summed, processes[0]] = summed.explode();
    }
    [summed, processes[1]] = summed.split();
    if (processes[1] === true) {
      processes[0] = true;
    }
  }

  return summed;
};

let root = new SnailNum(inputArr[0][0], inputArr[0][1], 0);
const toAdd = new SnailNum(inputArr[1][0], inputArr[1][1], 0);

root = processAdding(root, toAdd);

// for (let i = 1; i < inputArr.length; i++) {
//   const arr = inputArr[i];

//   const toAdd = new SnailNum(arr[0], arr[1], 0);

//   root = processAdding(root, toAdd);
// }

console.log(JSON.stringify(root.turnIntoArr()));
