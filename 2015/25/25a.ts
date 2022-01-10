const calculateNext = (num: number) => {
  return (num * 252533) % 33554393;
};

let num = 20151125;

console.log(num);

const inputRow = 3010;
const inputCol = 3019;

const getIterationsAtTarget = (row: number, col: number) => {
  return (
    (Math.pow(row + col - 1, 2) + row + col - 1) / 2 - (row + col - 1 - col)
  );
};

for (let i = 1; i < getIterationsAtTarget(inputRow, inputCol); i++) {
  num = calculateNext(num);
}

console.log(num);
