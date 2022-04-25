function findDisplaySize(grid: number[][]) {
  let maxX = 0;
  let maxY = 0;

  grid.forEach((tile) => {
    maxX = Math.max(tile[0], maxX);
    maxY = Math.max(tile[1], maxY);
  });

  return [maxX, maxY];
}

export default findDisplaySize;
