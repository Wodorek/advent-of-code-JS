const neighbors = (arr: number[][], row: number, column: number) => {
  const found = [];

  if (row > 0) {
    found.push([row - 1, column]);
    if (column > 0) {
      found.push([row - 1, column - 1]);
    }
    if (column < arr[row].length - 1) {
      found.push([row - 1, column + 1]);
    }
  }
  if (row < arr.length - 1) {
    found.push([row + 1, column]);
    if (column > 0) {
      found.push([row + 1, column - 1]);
    }
    if (column < arr[row].length - 1) {
      found.push([row + 1, column + 1]);
    }
  }

  if (column > 0) {
    found.push([row, column - 1]);
  }
  if (column < arr[row].length - 1) {
    found.push([row, column + 1]);
  }

  return found;
};

export default neighbors;
