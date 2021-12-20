const getPixelValue = (
  arr: string[][],
  cycle: number,
  row: number,
  column: number
) => {
  const found = [];

  const filler = cycle % 2 === 0 ? '#' : '.';

  found.push(
    arr[row - 1]?.[column - 1] || filler,
    arr[row - 1]?.[column] || filler,
    arr[row - 1]?.[column + 1] || filler,
    arr[row]?.[column - 1] || filler,
    arr[row]?.[column] || filler,
    arr[row]?.[column + 1] || filler,
    arr[row + 1]?.[column - 1] || filler,
    arr[row + 1]?.[column] || filler,
    arr[row + 1]?.[column + 1] || filler
  );

  return parseInt(
    found
      .map((el) => {
        return el === '.' ? 0 : 1;
      })
      .join(''),
    2
  );
};

export default getPixelValue;
