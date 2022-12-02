import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

interface IPoints {
  X: number;
  Y: number;
  Z: number;
}
interface IRules {
  A: IPoints;
  B: IPoints;
  C: IPoints;
}

const gameRules: IRules = {
  A: { X: 3, Y: 6, Z: 0 },
  B: { X: 0, Y: 3, Z: 6 },
  C: { X: 6, Y: 0, Z: 3 },
};

const shapeValues: IPoints = {
  X: 1,
  Y: 2,
  Z: 3,
};

function playGame(elfShape: 'A' | 'B' | 'C', myShape: 'X' | 'Y' | 'Z') {
  let score = 0;

  score += gameRules[elfShape][myShape];
  score += shapeValues[myShape];

  return score;
}

let scores = 0;

inputArr.forEach((game) => {
  scores += playGame(game[0], game[1]);
});

console.log(scores);
