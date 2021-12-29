import input from './input';
import prepareInput from './helpers/prepareInput';
import rotateSubmarine from './helpers/rotateSubmarine';
import { Submarine } from './helpers/types';
import rotateWaypoint from './helpers/rotateWaypoint';

const inputArr = prepareInput(input);

const submarine: Submarine = {
  direction: 'E',
  location: {
    N: 0,
    E: 0,
  },
};

const waypoint: {
  N: number;
  E: number;
} = {
  N: 1,
  E: 10,
};

const moveSubmarine = (arr: [string, number]) => {
  const directive = arr[0];
  const value = arr[1];

  if (directive === 'F') {
    console.log(waypoint.N, waypoint.E);
    submarine.location.N += waypoint.N * value;
    submarine.location.E += waypoint.E * value;
  }

  if (directive === 'R' || directive === 'L') {
    const [newN, newE] = rotateWaypoint(
      [waypoint.N, waypoint.E],
      value,
      directive
    );

    waypoint.N = newN;
    waypoint.E = newE;
  }

  if (directive === 'L') {
  }

  if (directive === 'N') {
    waypoint.N += value;
  }

  if (directive === 'S') {
    waypoint.N -= value;
  }

  if (directive === 'E') {
    waypoint.E += value;
  }

  if (directive === 'W') {
    waypoint.E -= value;
  }
};

inputArr.forEach((move) => {
  moveSubmarine(move);
  console.log(waypoint);
});

console.log(Math.abs(submarine.location.E) + Math.abs(submarine.location.N));
