import input from './input';
import prepareInput from './helpers/prepareInput';
import rotateSubmarine from './helpers/rotateSubmarine';
import { Submarine } from './helpers/types';

const inputArr = prepareInput(input);

const submarine: Submarine = {
  direction: 'E',
  location: {
    N: 0,
    E: 0,
  },
};

const moveSubmarine = (arr: [string, number]) => {
  const directive = arr[0];
  const value = arr[1];

  if (directive === 'F') {
    if (submarine.direction === 'E') {
      submarine.location.E += value;
    }
    if (submarine.direction === 'W') {
      submarine.location.E -= value;
    }

    if (submarine.direction === 'N') {
      submarine.location.N += value;
    }

    if (submarine.direction === 'S') {
      submarine.location.N -= value;
    }
  }

  if (directive === 'L' || directive === 'R') {
    submarine.direction = rotateSubmarine(
      submarine.direction,
      value,
      directive
    );
  }

  if (directive === 'N') {
    submarine.location.N += value;
  }

  if (directive === 'S') {
    submarine.location.N -= value;
  }

  if (directive === 'E') {
    submarine.location.E += value;
  }

  if (directive === 'W') {
    submarine.location.E -= value;
  }
};

inputArr.forEach((move) => {
  moveSubmarine(move);
});

console.log(Math.abs(submarine.location.E) + Math.abs(submarine.location.N));
