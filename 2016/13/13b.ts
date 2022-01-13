import neighbors from './helpers/neighbors';

export default {};

const bfs = () => {
  const visited: string[] = [];

  const queue: [number, number][] = [[1, 1]];

  const totalMoves = [];

  const from: number[][][] = [];

  let doneAdding = false;

  while (queue.length > 0) {
    const position = queue.pop()!;

    const coordinates = `${position[0]},${position[1]}`;

    visited.push(coordinates);

    const possibleMoves = neighbors(position);

    for (let i = 0; i < possibleMoves.length; i++) {
      const move = possibleMoves[i];

      if (!visited.includes(`${move[0]},${move[1]}`)) {
        if (!doneAdding) {
          queue.unshift(move);
        }

        totalMoves.push(move);

        if (from[move[0]]) {
          from[move[0]][move[1]] = position;
        } else {
          from[move[0]] = [];
          from[move[0]][move[1]] = position;
        }
      }
    }

    //this hurts my brain
    let nextStep: number[] | null =
      from[from.length - 1][from[from.length - 1].length - 1];

    let steps = 0;

    while (nextStep) {
      if (from[nextStep[0]]) {
        nextStep = from[nextStep[0]][nextStep[1]];
        steps++;
      } else nextStep = null;
    }

    if (steps >= 48) {
      doneAdding = true;
    }
  }
  return new Set(visited).size + 1;
};

console.log(bfs());
