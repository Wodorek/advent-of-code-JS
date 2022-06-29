import neighbors from './neighbors';

const bfs = (
  grid: string[][],
  from: [number, number],
  to: [number, number]
) => {
  const visited: string[] = [];

  const queue: [number, number][] = [from];

  const pathTaken: number[][][] = [];

  while (queue.length > 0) {
    const position = queue.pop()!;

    const possibleMoves = neighbors(grid, position);

    for (let i = 0; i < possibleMoves.length; i++) {
      const move = possibleMoves[i];

      const coordinates = `${move[0]},${move[1]}`;

      if (visited.includes(coordinates)) continue;

      visited.push(coordinates);

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

        while (nextStep && nextStep !== from) {
          nextStep = pathTaken[nextStep[0]][nextStep[1]];
          steps++;
        }
        return steps + 1;
      }
    }
  }
  return -1;
};

export default bfs;
