const incrementArr = (arr: number[], by: number) => {
  return arr.map((num) => {
    const newNum = num + by;

    if (newNum > 9) {
      return newNum - 9;
    } else {
      return newNum;
    }
  });
};

/**
 *
 * @param arr a grid of values
 * @returns a new array, consiting of input array as tiles, with each tile having its values increased by one
 */
const inflateInput = (arr: number[][]) => {
  const inflated = [];

  const height = arr.length;
  const width = arr[0].length;

  for (let i = 0; i < height; i++) {
    const newRow = [];

    for (let j = 0; j < 5; j++) {
      const line = incrementArr(arr[i], j);
      newRow.push(...line);
    }
    inflated.push(newRow);
  }

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < height; j++) {
      const newLine = incrementArr(inflated[j], i + 1);
      inflated.push(newLine);
    }
  }

  return inflated;
};

export default inflateInput;
