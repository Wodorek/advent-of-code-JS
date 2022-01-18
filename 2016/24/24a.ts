import input from './input';

import prepareInput from './helpers/prepareInput';
import neighbors from './helpers/neighbors';
import permute from './helpers/permute';
import path from 'path/posix';

const inputArr = prepareInput(input);

const inputCoordinates: { [key: string]: [number, number] } = {};

const findLocationCoordinates = (labirynth: string[]) => {
  for (let y = 0; y < labirynth.length; y++) {
    const row = labirynth[y];

    for (let x = 0; x < row.length; x++) {
      if (!isNaN(+labirynth[y][x])) {
        inputCoordinates[+labirynth[y][x]] = [x, y];
      }
    }
  }
};

let possibleRoutes = permute([0, 1, 2, 3, 4]);
possibleRoutes = possibleRoutes.filter((el) => {
  return el[0] === 0;
});

findLocationCoordinates(inputArr);

const bfs = (from: [number, number], to: [number, number]) => {
  const visited: string[] = [];

  const queue: [number, number][] = [from];

  const pathTaken: number[][][] = [];

  while (queue.length > 0) {
    console.log(queue.length);
    const position = queue.pop()!;

    const coordinates = `${position[0]},${position[1]}`;

    visited.push(coordinates);

    const possibleMoves = neighbors(inputArr, position);

    for (let i = 0; i < possibleMoves.length; i++) {
      const move = possibleMoves[i];

      if (!visited.includes(`${move[0]},${move[1]}`)) {
        queue.unshift(move);

        if (pathTaken[move[0]]) {
          pathTaken[move[0]][move[1]] = position;
        } else {
          pathTaken[move[0]] = [];
          pathTaken[move[0]][move[1]] = position;
        }

        if (`${move[0]},${move[1]}` === `${to[0]},${to[1]}`) {
          let nextStep = pathTaken[to[0]][to[1]];

          let steps = 0;

          while (nextStep) {
            nextStep = pathTaken[nextStep[0]]?.[nextStep[1]];
            steps++;
          }

          return steps;
        }
      }
    }
  }
  return -1;
};

//problematic step
console.log(bfs(inputCoordinates['0'], inputCoordinates['2']));

// const distances: { [key: string]: number } = {};

// const locations = Object.keys(inputCoordinates);

// let left = 0;
// let right = 1;

// while (left < locations.length - 1) {
//   const from = locations[left];
//   const to = locations[right];

//   console.log(left, right);

//   const distance = bfs(inputCoordinates[from], inputCoordinates[to]);

//   distances[`${from},${to}`] = distance;
//   distances[`${to},${from}`] = distance;

//   if (right === locations.length - 1) {
//     left++;
//     right = left + 1;
//   } else {
//     right++;
//   }
// }

// let minDistance = Infinity;

// possibleRoutes.forEach((route) => {
//   let left = 0;
//   let right = 1;

//   let totalDistance = 0;

//   while (right < route.length) {
//     totalDistance += distances[`${route[left]},${route[right]}`];
//     left++;
//     right++;
//   }

//   minDistance = Math.min(minDistance, totalDistance);
// });

// console.log(minDistance);
