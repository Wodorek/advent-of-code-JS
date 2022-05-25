import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

console.log(inputArr);

const [p1, p2] = inputArr;

while (p1.length > 0 && p2.length > 0) {
  const p1Card = p1.shift()!;
  const p2Card = p2.shift()!;

  if (p1Card > p2Card) {
    p1.push(p1Card, p2Card);
  } else {
    p2.push(p2Card, p1Card);
  }
}

const winner = p2.length > 0 ? p2 : p1;

const solution = winner.reverse().reduce((prev, val, idx) => {
  return prev + val * (idx + 1);
}, 0);

console.log(solution);
