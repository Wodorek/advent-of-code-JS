import isWall from './isWall';

const neighbors = (position: [number, number]) => {
  const validMoves: [number, number][] = [];
  const [x, y] = position;

  if (x - 1 >= 0 && !isWall(x - 1, y)) {
    validMoves.push([x - 1, y]);
  }

  if (!isWall(x + 1, y)) {
    validMoves.push([x + 1, y]);
  }

  if (y - 1 >= 0 && !isWall(x, y - 1)) {
    validMoves.push([x, y - 1]);
  }

  if (!isWall(x, y + 1)) {
    validMoves.push([x, y + 1]);
  }

  return validMoves;
};

export default neighbors;
