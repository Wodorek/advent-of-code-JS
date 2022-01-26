const getMoveDirection = (
  maze: string[][],
  position: number[],
  cameFrom: number[]
) => {
  let pastMoveAxis = null;

  if (cameFrom[0] === 1 || cameFrom[0] === -1) {
    pastMoveAxis = 'row';
  } else {
    pastMoveAxis = 'col';
  }

  if (pastMoveAxis === 'row') {
    if (maze[position[0]][position[1] - 1] === '-') {
      return [0, -1];
    } else {
      return [0, 1];
    }
  }

  if (pastMoveAxis === 'col') {
    if (maze[position[0] - 1][position[1]] === '|') {
      return [-1, 0];
    } else {
      return [1, 0];
    }
  }

  return [0, 0];
};

export default getMoveDirection;
