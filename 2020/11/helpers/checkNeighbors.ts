const checkNeighbors = (arr: string[], row: number, col: number) => {
  let takenAround: string[] = [];

  takenAround.push(
    arr[row - 1]?.[col - 1],
    arr[row - 1]?.[col],
    arr[row - 1]?.[col + 1],
    arr[row]?.[col - 1],
    arr[row]?.[col],
    arr[row]?.[col + 1],
    arr[row + 1]?.[col - 1],
    arr[row + 1]?.[col],
    arr[row + 1]?.[col + 1]
  );

  let count = 0;

  takenAround.forEach((el) => {
    if (el === '#') {
      count++;
    }
  });

  return count;
};

export default checkNeighbors;
