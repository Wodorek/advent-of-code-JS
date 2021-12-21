import input from './input';
import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

let dieRoll = 1;
let timesRolled = 0;

const scores = {
  p1: 0,
  p2: 0,
};

const positions = {
  p1: inputArr[0],
  p2: inputArr[1],
};

const rollDie = () => {
  const val = dieRoll * 3 + 3;
  dieRoll += 3;
  timesRolled += 3;
  return val;
};

let currentPlayer: 'p1' | 'p2' = 'p1';

const updatePosition = (player: 'p1' | 'p2', roll: number) => {
  const moveSpaces = roll % 10;

  positions[player] += moveSpaces;

  if (positions[player] > 10) {
    positions[player] -= 10;
  }

  scores[player] += positions[player];
};

const movePlayer = () => {
  const roll = rollDie();

  updatePosition(currentPlayer, roll);

  currentPlayer = currentPlayer === 'p1' ? 'p2' : 'p1';
};

while (scores['p1'] < 1000 && scores['p2'] < 1000) {
  movePlayer();
}

const lowerScore = Math.min(...Object.values(scores));
console.log;

console.log(lowerScore * timesRolled);
