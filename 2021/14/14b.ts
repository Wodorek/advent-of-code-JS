import pointsA from '../10/pointsA';
import prepareInput from './helpers/prepareInput';
import input from './input';

let [inputArr, lookup] = prepareInput(input);

let pairs: { [key: string]: number } = {};

//count initial pairs

for (let i = 0; i < inputArr.length; i++) {
  if (!inputArr[i + 1]) {
    continue;
  }
  const pair = `${inputArr[i]}${inputArr[i + 1]}`;

  if (pairs[pair]) {
    pairs[pair]++;
  } else {
    pairs[pair] = 1;
  }
}

//an actual solution starts here
for (let i = 0; i < 40; i++) {
  const pairKeys = Object.keys(pairs);

  const newPairs: { [key: string]: number } = {};

  pairKeys.forEach((pair) => {
    const newFrag = lookup[pair];

    const count = pairs[pair];

    const pairFrags = pair.split('');

    const newPair1 = `${pairFrags[0]}${newFrag}`;
    const newPair2 = `${newFrag}${pairFrags[1]}`;

    if (newPairs[newPair1]) {
      newPairs[newPair1] += 1 * count;
    } else {
      newPairs[newPair1] = 1 * count;
    }

    if (newPairs[newPair2]) {
      newPairs[newPair2] += 1 * count;
    } else {
      newPairs[newPair2] = 1 * count;
    }
  });

  pairs = newPairs;
}

//calculate the numbers, could be a calculate func

const firstChar = inputArr[0];
const lastChar = inputArr[inputArr.length - 1];

const letterCounts: { [key: string]: number } = {};

const countKeys = Object.keys(pairs);

countKeys.forEach((key) => {
  const letters = key.split('');

  if (letterCounts[letters[0]]) {
    letterCounts[letters[0]] += pairs[key];
  } else {
    letterCounts[letters[0]] = pairs[key];
  }

  if (letterCounts[letters[1]]) {
    letterCounts[letters[1]] += pairs[key];
  } else {
    letterCounts[letters[1]] = pairs[key];
  }
});

letterCounts[firstChar]++;
letterCounts[lastChar]++;

const vals = Object.values(letterCounts).map((el) => {
  return el / 2;
});

const max = Math.max(...vals);
const min = Math.min(...vals);

const solution = max - min;

console.log(solution);
