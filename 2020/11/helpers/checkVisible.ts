import lookInDirection from './lookInDirection';

const checkVisible = (arr: string[], row: number, col: number) => {
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [1, 1],
    [-1, 1],
    [-1, -1],
    [1, -1],
  ];

  let occupied = 0;

  directions.forEach((dir) => {
    const found = lookInDirection(arr, row, col, dir);
    if (found === '#') {
      occupied++;
    }
  });

  return occupied;
};

export default checkVisible;
