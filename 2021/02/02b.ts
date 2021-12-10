import input from './input';

const inputArr = input.split('\n').map((el) => {
  return el.split(' ');
});

let depth = 0;
let horizontal = 0;
let aim = 0;

for (let i = 0; i < inputArr.length; i++) {
  if (inputArr[i][0] === 'forward') {
    horizontal += +inputArr[i][1];
    depth += aim * +inputArr[i][1];
  }
  if (inputArr[i][0] === 'up') {
    aim -= +inputArr[i][1];
  }
  if (inputArr[i][0] === 'down') {
    aim += +inputArr[i][1];
  }
}

console.log(depth * horizontal);
