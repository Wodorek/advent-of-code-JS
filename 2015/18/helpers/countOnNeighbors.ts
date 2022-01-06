const countOnNeighbors = (arr: string[], row: number, column: number) => {
  const found = [];

  if (row > 0) {
    found.push(arr[row - 1][column]);
    if (column > 0) {
      found.push(arr[row - 1][column - 1]);
    }
    if (column < arr[row].length - 1) {
      found.push(arr[row - 1][column + 1]);
    }
  }
  if (row < arr.length - 1) {
    found.push(arr[row + 1][column]);
    if (column > 0) {
      found.push(arr[row + 1][column - 1]);
    }
    if (column < arr[row].length - 1) {
      found.push(arr[row + 1][column + 1]);
    }
  }

  if (column > 0) {
    found.push(arr[row][column - 1]);
  }
  if (column < arr[row].length - 1) {
    found.push(arr[row][column + 1]);
  }

  let onLightsCount = 0;
  found.forEach((el) => {
    if (el === '#') {
      onLightsCount++;
    }
  });

  return onLightsCount;
};

export default countOnNeighbors;
