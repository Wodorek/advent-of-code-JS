import input from './input';
import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

let sorted = inputArr.sort((a, b) => {
  return a > b ? 1 : -1;
});

sorted = [0, ...sorted, sorted[sorted.length - 1] + 3];

const divideIntoChunks = (arr: number[]) => {
  const chunks: number[][] = [];

  let chunkStart = 0;
  let left = 0;
  let right = 1;

  while (right < arr.length) {
    if (arr[right] - arr[left] === 3) {
      chunks.push(arr.slice(chunkStart, right));
      chunkStart = right;
    }
    right++;
    left++;
  }

  return chunks;
};

const chunks = divideIntoChunks(sorted);

let total = 1;

chunks.forEach((chunk) => {
  if (chunk.length === 5) {
    total *= 7;
  }

  if (chunk.length === 4) {
    total *= 4;
  }

  if (chunk.length === 3) {
    total *= 2;
  }
});

console.log(total);
