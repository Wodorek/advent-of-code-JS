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

describe('Works for parts of big example', () => {
  it('Step 1', () => {
    const arr1 = [
      [
        [0, [4, 5]],
        [0, 0],
      ],
      [
        [
          [4, 5],
          [2, 6],
        ],
        [9, 5],
      ],
    ];

    const arr2 = [
      7,
      [
        [
          [3, 7],
          [4, 3],
        ],
        [
          [6, 3],
          [8, 8],
        ],
      ],
    ];

    let num1 = new SnailNum(arr1[0], arr1[1]);
    const num2 = new SnailNum(arr2[0], arr2[1]);

    num1 = processSnailSum(num1, num2);

    expect(JSON.stringify(num1.turnIntoArr())).toBe(
      '[[[[4,0],[5,4]],[[7,7],[6,0]]],[[8,[7,7]],[[7,9],[5,0]]]]'
    );
  });
  it('Step 2', () => {
    const arr1 = [
      [
        [
          [4, 0],
          [5, 4],
        ],
        [
          [7, 7],
          [6, 0],
        ],
      ],
      [
        [8, [7, 7]],
        [
          [7, 9],
          [5, 0],
        ],
      ],
    ];

    const arr2 = [
      [
        2,
        [
          [0, 8],
          [3, 4],
        ],
      ],
      [
        [[6, 7], 1],
        [7, [1, 6]],
      ],
    ];

    let num1 = new SnailNum(arr1[0], arr1[1]);
    const num2 = new SnailNum(arr2[0], arr2[1]);

    num1 = processSnailSum(num1, num2);

    expect(JSON.stringify(num1.turnIntoArr())).toBe(
      '[[[[6,7],[6,7]],[[7,7],[0,7]]],[[[8,7],[7,7]],[[8,8],[8,0]]]]'
    );
  });
  it('Step 3', () => {
    const arr1 = [
      [
        [
          [6, 7],
          [6, 7],
        ],
        [
          [7, 7],
          [0, 7],
        ],
      ],
      [
        [
          [8, 7],
          [7, 7],
        ],
        [
          [8, 8],
          [8, 0],
        ],
      ],
    ];

    const arr2 = [
      [
        [[2, 4], 7],
        [6, [0, 5]],
      ],
      [
        [
          [6, 8],
          [2, 8],
        ],
        [
          [2, 1],
          [4, 5],
        ],
      ],
    ];

    let num1 = new SnailNum(arr1[0], arr1[1]);
    const num2 = new SnailNum(arr2[0], arr2[1]);

    num1 = processSnailSum(num1, num2);

    expect(JSON.stringify(num1.turnIntoArr())).toBe(
      '[[[[7,0],[7,7]],[[7,7],[7,8]]],[[[7,7],[8,8]],[[7,7],[8,7]]]]'
    );
  });
  it('Step 4', () => {
    const arr1 = [
      [
        [
          [7, 0],
          [7, 7],
        ],
        [
          [7, 7],
          [7, 8],
        ],
      ],
      [
        [
          [7, 7],
          [8, 8],
        ],
        [
          [7, 7],
          [8, 7],
        ],
      ],
    ];

    const arr2 = [
      7,
      [
        5,
        [
          [3, 8],
          [1, 4],
        ],
      ],
    ];

    let num1 = new SnailNum(arr1[0], arr1[1]);
    const num2 = new SnailNum(arr2[0], arr2[1]);

    num1 = processSnailSum(num1, num2);

    expect(JSON.stringify(num1.turnIntoArr())).toBe(
      '[[[[7,7],[7,8]],[[9,5],[8,7]]],[[[6,8],[0,8]],[[9,9],[9,0]]]]'
    );
  });
  it('Step 5', () => {
    const arr1 = [
      [
        [
          [7, 7],
          [7, 8],
        ],
        [
          [9, 5],
          [8, 7],
        ],
      ],
      [
        [
          [6, 8],
          [0, 8],
        ],
        [
          [9, 9],
          [9, 0],
        ],
      ],
    ];

    const arr2 = [
      [2, [2, 2]],
      [8, [8, 1]],
    ];

    let num1 = new SnailNum(arr1[0], arr1[1]);
    const num2 = new SnailNum(arr2[0], arr2[1]);

    num1 = processSnailSum(num1, num2);

    expect(JSON.stringify(num1.turnIntoArr())).toBe(
      '[[[[6,6],[6,6]],[[6,0],[6,7]]],[[[7,7],[8,9]],[8,[8,1]]]]'
    );
  });
  it('Step 6', () => {
    const arr1 = [
      [
        [
          [6, 6],
          [6, 6],
        ],
        [
          [6, 0],
          [6, 7],
        ],
      ],
      [
        [
          [7, 7],
          [8, 9],
        ],
        [8, [8, 1]],
      ],
    ];

    const arr2 = [2, 9];

    let num1 = new SnailNum(arr1[0], arr1[1]);
    const num2 = new SnailNum(arr2[0], arr2[1]);

    num1 = processSnailSum(num1, num2);

    expect(JSON.stringify(num1.turnIntoArr())).toBe(
      '[[[[6,6],[7,7]],[[0,7],[7,7]]],[[[5,5],[5,6]],9]]'
    );
  });
  it('Step 7', () => {
    const arr1 = [
      [
        [
          [6, 6],
          [7, 7],
        ],
        [
          [0, 7],
          [7, 7],
        ],
      ],
      [
        [
          [5, 5],
          [5, 6],
        ],
        9,
      ],
    ];

    const arr2 = [
      1,
      [
        [[9, 3], 9],
        [
          [9, 0],
          [0, 7],
        ],
      ],
    ];

    let num1 = new SnailNum(arr1[0], arr1[1]);
    const num2 = new SnailNum(arr2[0], arr2[1]);

    num1 = processSnailSum(num1, num2);

    expect(JSON.stringify(num1.turnIntoArr())).toBe(
      '[[[[7,8],[6,7]],[[6,8],[0,8]]],[[[7,7],[5,0]],[[5,5],[5,6]]]]'
    );
  });
  it('Step 8', () => {
    const arr1 = [
      [
        [
          [7, 8],
          [6, 7],
        ],
        [
          [6, 8],
          [0, 8],
        ],
      ],
      [
        [
          [7, 7],
          [5, 0],
        ],
        [
          [5, 5],
          [5, 6],
        ],
      ],
    ];

    const arr2 = [[[5, [7, 4]], 7], 1];

    let num1 = new SnailNum(arr1[0], arr1[1]);
    const num2 = new SnailNum(arr2[0], arr2[1]);

    num1 = processSnailSum(num1, num2);

    expect(JSON.stringify(num1.turnIntoArr())).toBe(
      '[[[[7,7],[7,7]],[[8,7],[8,7]]],[[[7,0],[7,7]],9]]'
    );
  });
  it('Step 9', () => {
    const arr1 = [
      [
        [
          [7, 7],
          [7, 7],
        ],
        [
          [8, 7],
          [8, 7],
        ],
      ],
      [
        [
          [7, 0],
          [7, 7],
        ],
        9,
      ],
    ];

    const arr2 = [
      [[[4, 2], 2], 6],
      [8, 7],
    ];

    let num1 = new SnailNum(arr1[0], arr1[1]);
    const num2 = new SnailNum(arr2[0], arr2[1]);

    num1 = processSnailSum(num1, num2);

    expect(JSON.stringify(num1.turnIntoArr())).toBe(
      '[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]'
    );
  });
});
