import input from './input';
import neighbors from './helpers/neighbors';
import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

inputArr.forEach((el) => {
  console.log(el.join(''));
});

const bfs = (from: [number, number]) => {
  const visited: string[] = [];

  const queue: [number, number][] = [[from[0], from[1]]];

  const pathTaken: number[][][] = [];

  while (queue.length > 0) {
    const position = queue.pop()!;

    const coordinates = `${position[0]},${position[1]}`;

    visited.push(coordinates);

    const possibleMoves = neighbors(inputArr, position);
    possibleMoves.sort((a, b) => {
      if (a[1] > b[1] || (a[1] === b[1] && a[0] > b[0])) return 1;
      if (a[1] === b[1] && a[0] === b[0]) return 0;
      return -1;
    });

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

        if (inputArr[move[1]][move[0]] === 'G') {
          return pathTaken[move[0]][move[1]];
        }
      }
    }
  }
  return [];
};

console.log(bfs([1, 1]));
