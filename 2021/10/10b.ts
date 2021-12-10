import prepareInput from './helpers/prepareInput';
import input from './input';
import mapping from './mapping';
import pointsB from './pointsB';

const inputArr = prepareInput(input);

let scores = [];

const openers = Object.keys(mapping);

for (let i = 0; i < inputArr.length; i++) {
  const el = inputArr[i];

  const queue: string[] = [];
  let corrupted = false;

  for (let j = 0; j < el.length; j++) {
    const bracket = el[j];

    if (openers.includes(bracket)) {
      queue.push(bracket);
    } else {
      const compare = queue.pop()!;

      if (bracket !== mapping[compare]) {
        corrupted = true;
      }
    }
  }
  if (!corrupted) {
    let score = 0;

    queue.reverse().forEach((el) => {
      score = score * 5 + pointsB[mapping[el]];
    });

    scores.push(score);
  }
}

const middleScore = scores.sort((a, b) => {
  return a > b ? -1 : 1;
})[Math.floor(scores.length / 2)];

console.log(middleScore);
