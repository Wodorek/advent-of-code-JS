import neighbors from './helpers/neighbors';

export default {};

const bfs = (to: [number, number]) => {
  const visited: string[] = [];

  const queue: [number, number][] = [[1, 1]];

  const from: number[][][] = [];

  let moves = 0;

  while (queue.length > 0) {
    const position = queue.pop()!;

    const coordinates = `${position[0]},${position[1]}`;

    visited.push(coordinates);

    const possibleMoves = neighbors(position);

    for (let i = 0; i < possibleMoves.length; i++) {
      const move = possibleMoves[i];

      if (!visited.includes(`${move[0]},${move[1]}`)) {
        queue.unshift(move);

        if (from[move[0]]) {
          from[move[0]][move[1]] = position;
        } else {
          from[move[0]] = [];
          from[move[0]][move[1]] = position;
        }

        if (`${move[0]},${move[1]}` === `${to[0]},${to[1]}`) {
          return from;
        }
      }
    }
  }
  return [];
};

const a = bfs([31, 39]);

let nextStep = a[31][39];

let steps = 0;

while (nextStep) {
  nextStep = a[nextStep[0]][nextStep[1]];
  steps++;
}

console.log(steps);
