function getSpacesAround(grid: string[][], x: number, y: number) {
  const found = [];

  if (x > 0) {
    found.push([x - 1, y]);
    if (y > 0) {
      found.push([x - 1, y - 1]);
    }
    if (y < grid[x].length - 1) {
      found.push([x - 1, y + 1]);
    }
  }
  if (x < grid.length - 1) {
    found.push([x + 1, y]);
    if (y > 0) {
      found.push([x + 1, y - 1]);
    }
    if (y < grid[x].length - 1) {
      found.push([x + 1, y + 1]);
    }
  }

  if (y > 0) {
    found.push([x, y - 1]);
  }
  if (y < grid[x].length - 1) {
    found.push([x, y + 1]);
  }

  return found;
}

export default getSpacesAround;
