import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input)[0];

console.log('from start', inputArr);

class SnailNum {
  left: number | SnailNum;
  right: number | SnailNum;
  constructor(
    left: number | SnailNum | number[],
    right: number | SnailNum | number[]
  ) {
    if (typeof left === 'number' || left instanceof SnailNum) {
      this.left = left;
    } else {
      this.left = new SnailNum(left[0], left[1]);
    }

    if (typeof right === 'number' || right instanceof SnailNum) {
      this.right = right;
    } else {
      this.right = new SnailNum(right[0], right[1]);
    }
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
}

const addSnailNum = (num1: SnailNum, num2: SnailNum) => {
  return new SnailNum(num1, num2);
};

const arr1 = [1, 2];
const arr2 = [[3, 4], 5];

const snail1 = new SnailNum(arr1[0], arr1[1]);
const snail2 = new SnailNum(arr2[0], arr2[1]);

const snail3 = addSnailNum(snail1, snail2);

console.log(snail3.turnIntoArr());
