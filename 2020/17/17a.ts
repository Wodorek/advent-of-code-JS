import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

inputArr.forEach((line) => {
  console.log(line.join(''));
});

const expandIntoCube = (arr: string[][]) => {
  const cube: string[][][] = [arr];

  for (let i = 0; i < arr.length - 1; i++) {
    const slice = [];

    for (let j = 0; j < arr.length; j++) {
      slice.push(new Array(arr.length).fill('.'));
    }

    cube.push(slice);
  }

  return cube;
};

console.log(expandIntoCube(inputArr));
