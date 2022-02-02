import input from './input';

import prepareInput from './helpers/prepareInput';
import getTaxiDistance from './helpers/getTaxiDistance';

const inputArr = prepareInput(input);

const minX = inputArr.reduce((prev, val) => {
  return Math.min(prev, val[0]);
}, Infinity);

const minY = inputArr.reduce((prev, val) => {
  return Math.min(prev, val[1]);
}, Infinity);

const maxX = inputArr.reduce((prev, val) => {
  return Math.max(prev, val[0]);
}, -Infinity);

const maxY = inputArr.reduce((prev, val) => {
  return Math.max(prev, val[1]);
}, -Infinity);

const reduced = inputArr.map((el) => {
  return [el[0] - minX, el[1] - minY];
});

const produceArray = (inputs: number[][], mod = 0) => {
  const arr: string[][] = [];

  const modArr: string[] = [];
  modArr.length = mod;
  modArr.fill('.');

  for (let i = 0; i < maxY + mod; i++) {
    const newRow = [];

    for (let j = 0; j < maxX + mod; j++) {
      newRow.push('.');
    }
    arr.push(newRow);
  }

  inputs.forEach((input, idx) => {
    arr[input[1]][input[0]] = `${idx}`;
  });

  return arr;
};

const arr1 = produceArray(reduced);

const distanceToAll = (from: number[], to: number[][]) => {
  let total = 0;

  to.forEach((destination, idx) => {
    const distance = getTaxiDistance(destination, from);

    total += distance;
  });

  return `${total}`;
};

for (let i = 0; i < arr1.length; i++) {
  for (let j = 0; j < arr1[0].length; j++) {
    arr1[i][j] = distanceToAll([j, i], reduced);
  }
}
const counts1: { [key: string]: number } = {};

arr1.forEach((line) => {
  line.forEach((char) => {
    if (!counts1[char]) {
      counts1[char] = 1;
    } else {
      counts1[char]++;
    }
  });
});

let totalSize = 0;

Object.keys(counts1).forEach((key) => {
  if (+key < 10000) {
    totalSize += counts1[key];
  }
});

console.log(totalSize);
