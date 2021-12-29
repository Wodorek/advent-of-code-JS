import input from './input';

const mapping: { [key: string]: number } = {
  '(': 1,
  ')': -1,
};

let floor = 0;

const split = input.split('');

for (let i = 0; i < split.length; i++) {
  floor += mapping[split[i]];

  if (floor === -1) {
    console.log(i + 1);
    break;
  }
}

console.log(floor);
