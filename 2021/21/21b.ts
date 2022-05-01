import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

let positions = inputArr;
let scores = [0, 0];
const rolls = [1, 2, 3];
const wins = [0, 0];

let gameCounts = {
  [[positions, scores].join(';')]: 1,
};

console.log(gameCounts);

while (Object.entries(gameCounts).length > 0) {
  for (const i of [0, 1]) {
    const nextGameCounts: { [key: string]: any } = {};
    for (const [state, gameCount] of Object.entries(gameCounts)) {
      [positions, scores] = state
        .split(';')
        .map((s) => s.split(',').map(Number));

      for (const r1 of rolls) {
        for (const r2 of rolls) {
          for (const r3 of rolls) {
            const nextPositions = [...positions];
            nextPositions[i] = ((positions[i] + r1 + r2 + r3 - 1) % 10) + 1;

            const nextScores = [...scores];
            nextScores[i] += nextPositions[i];

            if (nextScores[i] >= 21) {
              wins[i] += gameCount;
              continue;
            }

            const nextState = [nextPositions, nextScores].join(';');
            nextGameCounts[nextState] =
              (nextGameCounts[nextState] ?? 0) + gameCount;
          }
        }
      }
    }
    gameCounts = nextGameCounts;
  }
}

console.log(Math.max(...wins));
