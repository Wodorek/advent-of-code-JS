import input from './inputFile';

const dataArr = input.split('\n');

let times = 0;

for (let i = 0; i < dataArr.length; i++) {
  if (+dataArr[i + 1] > +dataArr[i]) {
    times++;
  }
}

console.log(times);
