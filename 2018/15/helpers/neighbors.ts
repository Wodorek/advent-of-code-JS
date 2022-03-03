const neighbors = (arr: string[][], position: [number, number]) => {
  const validMoves: [number, number][] = [];
  const [x, y] = position;

  if (x - 1 >= 0 && arr[y][x - 1] !== '#') {
    validMoves.push([x - 1, y]);
  }

  if (arr[y][x + 1] !== '#') {
    validMoves.push([x + 1, y]);
  }

  if (y - 1 >= 0 && arr[y - 1][x] !== '#') {
    validMoves.push([x, y - 1]);
  }

  if (arr[y + 1][x] !== '#') {
    validMoves.push([x, y + 1]);
  }

  return validMoves;
};

export default neighbors;
