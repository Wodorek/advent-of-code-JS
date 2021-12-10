import prepareInput from './helpers/prepareInput';
import input from './input';
import mapping from './mapping';
import points from './pointsA';

const inputArr = prepareInput(input);

let score = 0;

const openers = Object.keys(mapping);

for (let i = 0; i < inputArr.length; i++) {
  const el = inputArr[i];

  const queue: string[] = [];

  for (let j = 0; j < el.length; j++) {
    const bracket = el[j];

    if (openers.includes(bracket)) {
      queue.push(bracket);
    } else {
      const compare = queue.pop()!;

      if (bracket !== mapping[compare]) {
        score += points[bracket];
      }
    }
  }
}

console.log(score);
