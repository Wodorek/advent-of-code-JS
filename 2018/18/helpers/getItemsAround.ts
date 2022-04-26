function getItemsAround(grid: string[][], x: number, y: number) {
  const found = [];

  if (x > 0) {
    found.push(grid[y][x - 1]);
    if (y > 0) {
      found.push(grid[y - 1][x - 1]);
    }
    if (y < grid[x].length - 1) {
      found.push(grid[y + 1][x - 1]);
    }
  }
  if (x < grid.length - 1) {
    found.push(grid[y][x + 1]);
    if (y > 0) {
      found.push(grid[y - 1][x + 1]);
    }
    if (y < grid[x].length - 1) {
      found.push(grid[y + 1][x + 1]);
    }
  }

  if (y > 0) {
    found.push(grid[y - 1][x]);
  }
  if (y < grid[x].length - 1) {
    found.push(grid[y + 1][x]);
  }

  return found;
}

export default getItemsAround;
