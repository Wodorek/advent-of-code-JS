import input from './inputFile';

const dataArr = input.split('\n');

let idx = 0;
let times = 0;

for (let i = 0; i < dataArr.length; i++) {
  if (+dataArr[idx + 1] > +dataArr[idx]) {
    times++;
  }
  idx++;
}

console.log(times);
