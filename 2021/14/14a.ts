import prepareInput from './helpers/prepareInput';
import input from './input';

let [inputArr, lookup] = prepareInput(input);

//Yes, this solution is pretty wordy and not very efficient, but it was interesting to program kind of step by step of putting together this long chain
//For an actual solution, that doesn't require terabytes of memory, please see 14b.ts

for (let i = 0; i < 10; i++) {
  const pairs: string[][] = [];

  const parts = inputArr.split('');

  //create individual pairs to modifiy, to avoid chaining modifications
  parts.forEach((part, idx) => {
    if (idx < parts.length - 1) pairs.push([part, parts[idx + 1]]);
  });

  //insert the new element into each pair
  pairs.forEach((pair, idx) => {
    const key = `${pair[0]}${pair[1]}`;
    pairs[idx].splice(1, 0, lookup[key]);
  });

  const newPolymer: string[] = [];

  //remove duplicates at the end of each pair
  const intermediate = pairs.map((el, idx) => {
    if (idx === pairs.length - 1) {
      return el;
    } else {
      return el.slice(0, 2);
    }
  });

  // create new polymer string
  intermediate.forEach((el) => {
    newPolymer.push(...el);
  });

  inputArr = newPolymer.join('');
}

//count the elements
const counts: { [key: string]: number } = {};

inputArr.split('').forEach((el) => {
  if (counts[el]) {
    counts[el]++;
  } else {
    counts[el] = 1;
  }
});

const vals = Object.values(counts);

//calculate the solution
const min = Math.min(...vals);
const max = Math.max(...vals);

const solution = max - min;

console.log(solution);
