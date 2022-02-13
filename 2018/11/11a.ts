export {};

const input = 4172;

const generateId = (x: number, y: number, serial: number) => {
  const rackID = x + 10;
  const powerLevel = (((x + 10) * y + serial) * (x + 10)).toString();

  const hundreds = +powerLevel[powerLevel.length - 3] || 0;

  return hundreds - 5;
};

const getSquareSum = (arr: number[][], x: number, y: number) => {
  return [
    ...arr[y].slice(x, x + 3),
    ...arr[y + 1].slice(x, x + 3),
    ...arr[y + 2].slice(x, x + 3),
  ].reduce((prev, val) => {
    return prev + val;
  }, 0);
};

const grid: number[][] = [];

for (let i = 0; i < 300; i++) {
  const row: number[] = [];

  for (let j = 0; j < 300; j++) {
    row.push(generateId(i + 1, j + 1, input));
  }

  grid.push(row);
}

let coords = '';
let maxSum = -Infinity;

for (let i = 0; i < grid.length - 2; i++) {
  for (let j = 0; j < grid[0].length - 2; j++) {
    const value = getSquareSum(grid, j, i);
    if (value > maxSum) {
      maxSum = value;
      coords = `${i + 1},${j + 1}`;
    }
  }
}

console.log(maxSum);

console.log(coords);
