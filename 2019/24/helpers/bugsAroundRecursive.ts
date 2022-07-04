/**
 *
 * @param grid
 * @param position [slice, x, y]
 *
 *
 *Thankfully you can't go to jail for writing bad, bloated functions
 */
function bugsAroundRecursive(grid: string[][][], position: number[]) {
  const [slice, x, y] = position;

  const around: string[] = [];

  if (x === 0) {
    around.push(grid[slice - 1]?.[1][2] || '.');
  }

  if (x === 4) {
    around.push(grid[slice - 1]?.[3][2] || '.');
  }

  if (y === 0) {
    around.push(grid[slice - 1]?.[2][1] || '.');
  }
  if (y === 4) {
    around.push(grid[slice - 1]?.[2][3] || '.');
  }

  if (x === 1 && y === 2) {
    around.push(...(grid[slice + 1]?.[0] || '.'));
  }

  if (x === 3 && y === 2) {
    around.push(...(grid[slice + 1]?.[4] || '.'));
  }

  if (y === 1 && x === 2) {
    if (grid[slice + 1]) {
      grid[slice + 1].forEach((row) => {
        around.push(row[0]);
      });
    }
  }

  if (x === 2 && y === 3) {
    if (grid[slice + 1]) {
      grid[slice + 1].forEach((row) => {
        around.push(row[4]);
      });
    }
  }

  const mods = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  const restOfPositions = mods
    .map((el) => {
      return [el[0] + x, el[1] + y];
    })
    .filter((el) => {
      return !(el[0] === 2 && el[1] === 2);
    });

  restOfPositions.forEach((pos) => {
    around.push(grid[slice]?.[pos[0]]?.[pos[1]] || '');
  });

  return around.filter((el) => el !== '').filter((el) => el !== '.').length;
}

export default bugsAroundRecursive;
