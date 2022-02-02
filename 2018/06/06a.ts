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
const arr2 = produceArray(inputArr, 1);

const getClosestTo = (from: number[], to: number[][]) => {
  let closest = Infinity;
  let repeated = false;
  let closestNode = 0;

  to.forEach((destination, idx) => {
    const distance = getTaxiDistance(destination, from);

    if (distance !== 0) {
      if (distance < closest) {
        closest = distance;
        repeated = false;
        closestNode = idx;
      } else if (distance === closest) {
        repeated = true;
      }
    }
  });

  return repeated ? 'X' : `${closestNode}`;
};

for (let i = 0; i < arr1.length; i++) {
  for (let j = 0; j < arr1[0].length; j++) {
    if (arr1[i][j] !== '.') {
      continue;
    }
    arr1[i][j] = getClosestTo([j, i], reduced);
  }
}

for (let i = 0; i < arr2.length; i++) {
  for (let j = 0; j < arr2[0].length; j++) {
    if (arr2[i][j] !== '.') {
      continue;
    }
    arr2[i][j] = getClosestTo([j, i], inputArr);
  }
}

const counts1: { [key: string]: number } = {};
const counts2: { [key: string]: number } = {};

arr1.forEach((line) => {
  line.forEach((char) => {
    if (!counts1[char]) {
      counts1[char] = 1;
    } else {
      counts1[char]++;
    }
  });
});

arr2.forEach((line) => {
  line.forEach((char) => {
    if (!counts2[char]) {
      counts2[char] = 1;
    } else {
      counts2[char]++;
    }
  });
});

Object.keys(counts1).forEach((key) => {
  if (counts1[key] !== counts2[key]) {
    delete counts2[key];
  }
});

console.log(Math.max(...Object.values(counts2)));
