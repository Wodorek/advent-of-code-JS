const checkNeighbors = (arr: string[][], row: number, column: number) => {
  const found = [];

  if (row > 0 && arr[row - 1][column] === '#') {
    found.push([row - 1, column]);
  }
  if (row < arr.length - 1 && arr[row + 1][column] === '#') {
    found.push([row + 1, column]);
  }

  if (column > 0 && arr[row][column - 1] === '#') {
    found.push([row, column - 1]);
  }
  if (column < arr[row].length - 1 && arr[row][column + 1] === '#') {
    found.push([row, column + 1]);
  }

  return found;
};

export default checkNeighbors;
