import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

console.log(inputArr);

const width = 25;
const height = 6;

let searchedIndex = -1;
let minZeroes = Infinity;

const layers: number[][] = [];

for (let i = 0; i < inputArr.length; i += width * height) {
  layers.push([...inputArr.slice(i, i + width * height)]);
}

layers.forEach((layer, idx) => {
  let zeroes = 0;

  layer.forEach((num) => {
    if (num === 0) {
      zeroes++;
    }
  });

  if (zeroes < minZeroes) {
    minZeroes = zeroes;
    searchedIndex = idx;
  }
});

let ones = 0;
let twos = 0;

layers[searchedIndex].forEach((num) => {
  if (num === 1) {
    ones++;
  }
  if (num === 2) {
    twos++;
  }
});

console.log(ones * twos);
