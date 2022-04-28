import { processSnailSum, SnailNum } from './18a';
import prepareInput from './helpers/prepareInput';

describe('Explodes correctly', () => {
  it('Works for example 1', () => {
    const arr: any[] = [[[[[9, 8], 1], 2], 3], 4];

    const snailNum = new SnailNum(arr[0], arr[1]);

    expect(snailNum.explode()[1]).toBe('[[[[0,9],2],3],4]');
  });

  it('Works for example 2', () => {
    const arr: any[] = [7, [6, [5, [4, [3, 2]]]]];

    const snailNum = new SnailNum(arr[0], arr[1]);

    expect(snailNum.explode()[1]).toBe('[7,[6,[5,[7,0]]]]');
  });

  it('Works for example 3', () => {
    const arr: any[] = [[6, [5, [4, [3, 2]]]], 1];

    const snailNum = new SnailNum(arr[0], arr[1]);

    expect(snailNum.explode()[1]).toBe('[[6,[5,[7,0]]],3]');
  });

  it('Works for example 4', () => {
    const arr: any[] = [
      [3, [2, [1, [7, 3]]]],
      [6, [5, [4, [3, 2]]]],
    ];

    const snailNum = new SnailNum(arr[0], arr[1]);

    expect(snailNum.explode()[1]).toBe('[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]');
  });

  it('Works for example 5', () => {
    const arr: any[] = [
      [3, [2, [8, 0]]],
      [9, [5, [4, [3, 2]]]],
    ];

    const snailNum = new SnailNum(arr[0], arr[1]);

    expect(snailNum.explode()[1]).toBe('[[3,[2,[8,0]]],[9,[5,[7,0]]]]');
  });

  it('Works for reducing', () => {
    const arr1 = [
      [[[4, 3], 4], 4],
      [7, [[8, 4], 9]],
    ];

    const arr2 = [1, 1];

    let num1 = new SnailNum(arr1[0], arr1[1]);
    let num2 = new SnailNum(arr2[0], arr2[1]);

    const summedUp = processSnailSum(num1, num2);

    expect(JSON.stringify(summedUp.turnIntoArr())).toBe(
      '[[[[0,7],4],[[7,8],[6,0]]],[8,1]]'
    );
  });

  it('Works for first small sum', () => {
    const input = `[1,1]
[2,2]
[3,3]
[4,4]`;

    const inputArr = prepareInput(input);

    let num1 = new SnailNum(inputArr[0][0], inputArr[0][1]);

    const queue = [...inputArr.slice(1)];

    while (queue.length > 0) {
      const toProcess = queue.shift();
      const toAdd = new SnailNum(toProcess[0], toProcess[1]);

      num1 = processSnailSum(num1, toAdd);
    }

    expect(JSON.stringify(num1.turnIntoArr())).toBe(
      '[[[[1,1],[2,2]],[3,3]],[4,4]]'
    );
  });

  it('Works for third small sum', () => {
    const input = `[1,1]
[2,2]
[3,3]
[4,4]
[5,5]
[6,6]`;

    const inputArr = prepareInput(input);

    let num1 = new SnailNum(inputArr[0][0], inputArr[0][1]);

    const queue = [...inputArr.slice(1)];

    while (queue.length > 0) {
      const toProcess = queue.shift();
      const toAdd = new SnailNum(toProcess[0], toProcess[1]);

      num1 = processSnailSum(num1, toAdd);
    }

    expect(JSON.stringify(num1.turnIntoArr())).toBe(
      '[[[[5,0],[7,4]],[5,5]],[6,6]]'
    );
  });

  it('Works for large sum', () => {
    const input = `[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]
[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]
[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]
[[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]
[7,[5,[[3,8],[1,4]]]]
[[2,[2,2]],[8,[8,1]]]
[2,9]
[1,[[[9,3],9],[[9,0],[0,7]]]]
[[[5,[7,4]],7],1]
[[[[4,2],2],6],[8,7]]`;

    const inputArr = prepareInput(input);

    let num1 = new SnailNum(inputArr[0][0], inputArr[0][1]);

    const queue = [...inputArr.slice(1)];

    while (queue.length > 0) {
      const toProcess = queue.shift();
      const toAdd = new SnailNum(toProcess[0], toProcess[1]);

      num1 = processSnailSum(num1, toAdd);
    }

    expect(JSON.stringify(num1.turnIntoArr())).toBe(
      '[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]'
    );
  });
});
