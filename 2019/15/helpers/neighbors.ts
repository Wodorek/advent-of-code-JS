function neighbors(grid: string[][], position: [number, number]) {
  const validMoves: [number, number][] = [];
  const [x, y] = position;

  if (x - 1 >= 0 && grid[x - 1][y] !== '|') {
    validMoves.push([x - 1, y]);
  }

  if (x + 1 < grid.length && grid[x + 1][y] !== '|') {
    validMoves.push([x + 1, y]);
  }

  if (y - 1 >= 0 && grid[x][y - 1] !== '|') {
    validMoves.push([x, y - 1]);
  }

  if (y + 1 < grid[0].length && grid[x][y + 1] !== '|') {
    validMoves.push([x, y + 1]);
  }

  return validMoves;
}

export default neighbors;
