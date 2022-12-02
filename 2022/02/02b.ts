import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const shapeValues = {
  A: 1,
  B: 2,
  C: 3,
};

const gameRules = {
  A: { X: shapeValues.C, Y: shapeValues.A, Z: shapeValues.B },
  B: { X: shapeValues.A, Y: shapeValues.B, Z: shapeValues.C },
  C: { X: shapeValues.B, Y: shapeValues.C, Z: shapeValues.A },
};

// R P S
// A B C

const outcomeValues = {
  X: 0,
  Y: 3,
  Z: 6,
};

function playGame(elfShape: 'A' | 'B' | 'C', myShape: 'X' | 'Y' | 'Z') {
  let score = 0;

  score += outcomeValues[myShape];
  score += gameRules[elfShape][myShape];

  return score;
}

let scores = 0;

inputArr.forEach((game) => {
  scores += playGame(game[0], game[1]);
});

console.log(scores);
