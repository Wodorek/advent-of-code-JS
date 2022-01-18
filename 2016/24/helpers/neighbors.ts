const neighbors = (arr: string[], position: [number, number]) => {
  const validMoves: [number, number][] = [];
  const [x, y] = position;

  if (x - 1 > 0 && arr[y][x - 1] !== '#') {
    validMoves.push([x - 1, y]);
  }

  if (x + 1 < arr[0].length && arr[y][x + 1] !== '#') {
    validMoves.push([x + 1, y]);
  }

  if (y - 1 > 0 && arr[y - 1][x] !== '#') {
    validMoves.push([x, y - 1]);
  }

  if (y + 1 < arr.length - 1 && arr[y + 1][x] !== '#') {
    validMoves.push([x, y + 1]);
  }

  return validMoves;
};

export default neighbors;
