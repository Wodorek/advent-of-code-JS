function bugsAround(grid: string[][], position: number[]) {
  let foundBugs = 0;

  const [x, y] = position;

  if (grid[x + 1]?.[y] === '#') {
    foundBugs++;
  }

  if (grid[x - 1]?.[y] === '#') {
    foundBugs++;
  }

  if (grid[x]?.[y + 1] === '#') {
    foundBugs++;
  }

  if (grid[x]?.[y - 1] === '#') {
    foundBugs++;
  }

  return foundBugs;
}

export default bugsAround;
