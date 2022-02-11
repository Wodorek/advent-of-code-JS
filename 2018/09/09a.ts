import input from './input';

import prepareInput from './helpers/prepareInput';

const [players, marbles] = prepareInput(input);

const circle = [0];

let currentMarble = 1;
let currentPlayer = 1;
let currentIdx = 0;

const points: { [key: number]: number } = {};

while (currentMarble < marbles) {
  if (currentMarble % 23 === 0) {
    let gainedPoints = 0;

    let newIdx = currentIdx - 7;
    if (newIdx < 0) {
      newIdx += circle.length;
    }
    const removedMarble = circle.splice(newIdx, 1);

    gainedPoints += currentMarble;
    gainedPoints += removedMarble[0];

    if (points[currentPlayer]) {
      points[currentPlayer] += gainedPoints;
    } else {
      points[currentPlayer] = gainedPoints;
    }

    currentIdx = newIdx;
  } else {
    currentIdx += 2;
    while (currentIdx > circle.length) {
      currentIdx -= circle.length;
    }

    circle.splice(currentIdx, 0, currentMarble);
  }

  currentMarble++;
  currentPlayer++;
  if (currentPlayer > players) {
    currentPlayer = 1;
  }
}

console.log(Math.max(...Object.values(points)));
