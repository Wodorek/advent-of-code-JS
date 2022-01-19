import findMoveDir from './helpers/findMoveDir';
import isOpen from './helpers/isOpen';

const input = 'qtetzkpl';

const yetAnotherBfs = (password: string) => {
  const queue: { coordinates: [number, number]; path: string }[] = [
    { coordinates: [0, 0], path: '' },
  ];

  while (queue.length > 0) {
    const position = queue.pop()!;

    const nextMoves = isOpen(
      `${password}${position.path}`,
      position.coordinates[0],
      position.coordinates[1]
    );

    for (let i = 0; i < nextMoves.length; i++) {
      const move = nextMoves[i];

      if (
        move[0] !== -1 &&
        (move[0] !== position.coordinates[0] ||
          move[1] !== position.coordinates[1])
      ) {
        if (move[0] === 3 && move[1] === 3) {
          return `${position.path}${findMoveDir(position.coordinates, move)}`;
        }

        queue.unshift({
          coordinates: move,
          path: `${position.path}${findMoveDir(position.coordinates, move)}`,
        });
      }
    }
  }
};

console.log(yetAnotherBfs(input));

export default yetAnotherBfs;
