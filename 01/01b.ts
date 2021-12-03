import input from './inputFile';

const inputArr = input.split('\n');

let times = 0;

for (let i = 0; i < inputArr.length; i++) {
  const currWindow = +inputArr[i] + +inputArr[i + 1] + +inputArr[i + 2];
  const nextWindow = +inputArr[i + 1] + +inputArr[i + 2] + +inputArr[i + 3];

  if (nextWindow > currWindow) {
    times++;
  }
}

console.log(times);
