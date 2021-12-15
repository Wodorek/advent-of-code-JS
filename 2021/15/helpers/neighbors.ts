const neighbors = (map: number[][], row: number, col: number) => {
  const result = [];
  if (row > 0) {
    result.push([row - 1, col]);
  }
  if (row < map.length - 1) {
    result.push([row + 1, col]);
  }
  if (col > 0) {
    result.push([row, col - 1]);
  }
  if (col < map[row].length - 1) {
    result.push([row, col + 1]);
  }
  return result as [number, number][];
};

export default neighbors;
