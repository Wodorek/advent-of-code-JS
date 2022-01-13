import neighbors from './helpers/neighbors';

export default {};

const bfs = () => {
  const visited: string[] = [];

  const queue: [number, number][] = [[1, 1]];

  const from: number[][][] = [];

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
      }
    }

    let nextStep = null;
    let steps = 0;

    if (from[position[0]]) {
      nextStep = from[position[0]][position[1]];
    }

    while (nextStep) {
      if (from[nextStep[0]]) {
        nextStep = from[nextStep[0]][nextStep[1]];
      } else {
        nextStep = null;
      }

      steps++;
    }

    if (steps > 50) {
      break;
    }
  }

  console.log(new Set(visited).size - 1);
};

bfs();
