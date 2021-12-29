import input from './input';

const mapping: { [key: string]: number } = {
  '(': 1,
  ')': -1,
};

let floor = 0;

input.split('').forEach((bracket) => {
  floor += mapping[bracket];
});

console.log(floor);
