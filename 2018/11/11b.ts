export {};

const input = 4172;

const generateId = (x: number, y: number, serial: number) => {
  const rackID = x + 10;
  const powerLevel = (((x + 10) * y + serial) * (x + 10)).toString();

  const hundreds = +powerLevel[powerLevel.length - 3] || 0;

  return hundreds - 5;
};

const getSquareSum = (arr: number[][], x: number, y: number, size: number) => {
  let total = 0;

  for (let i = 0; i < size; i++) {
    total += arr[y + i].slice(x, x + size).reduce((prev, val) => {
      return prev + val;
    }, 0);
  }

  return total;
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

for (let size = 2; size < 33; size++) {
  for (let i = 0; i < grid.length - size; i++) {
    for (let j = 0; j < grid[0].length - size; j++) {
      const value = getSquareSum(grid, j, i, size);
      if (value > maxSum) {
        maxSum = value;
        coords = `${i + 1},${j + 1},${size}`;
      }
    }
  }

  console.log(maxSum);
}

console.log(maxSum);

console.log(coords);
