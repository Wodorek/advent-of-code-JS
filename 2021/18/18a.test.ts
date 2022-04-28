import { SnailNum } from './18a';

describe('Explodes correctly', () => {
  it('Works for example 1', () => {
    const arr: any[] = [[[[[9, 8], 1], 2], 3], 4];

    const snailNum = new SnailNum(arr[0], arr[1], 0, null, 'root');

    expect(snailNum.explode()[1]).toBe('[[[[0,9],2],3],4]');
  });

  it('Works for example 2', () => {
    const arr: any[] = [7, [6, [5, [4, [3, 2]]]]];

    const snailNum = new SnailNum(arr[0], arr[1], 0, null, 'root');

    expect(snailNum.explode()[1]).toBe('[7,[6,[5,[7,0]]]]');
  });

  it('Works for example 3', () => {
    const arr: any[] = [[6, [5, [4, [3, 2]]]], 1];

    const snailNum = new SnailNum(arr[0], arr[1], 0, null, 'root');

    expect(snailNum.explode()[1]).toBe('[[6,[5,[7,0]]],3]');
  });

  it('Works for example 4', () => {
    const arr: any[] = [
      [3, [2, [1, [7, 3]]]],
      [6, [5, [4, [3, 2]]]],
    ];

    const snailNum = new SnailNum(arr[0], arr[1], 0, null, 'root');

    expect(snailNum.explode()[1]).toBe('[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]');
  });

  it('Works for example 5', () => {
    const arr: any[] = [
      [3, [2, [8, 0]]],
      [9, [5, [4, [3, 2]]]],
    ];

    const snailNum = new SnailNum(arr[0], arr[1], 0, null, 'root');

    expect(snailNum.explode()[1]).toBe('[[3,[2,[8,0]]],[9,[5,[7,0]]]]');
  });
});
