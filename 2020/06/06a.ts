import prepareInput from './helpers/prepareInput';
import input from './input';

const inputArr = prepareInput(input);

const groups = [];
let group = new Set();

for (let i = 0; i < inputArr.length; i++) {
  const element = inputArr[i];

  if (element === '') {
    groups.push(group);
    group = new Set();
  } else {
    const split = element.split('');
    split.forEach((el) => {
      group.add(el);
    });
  }
}

let total = 0;

groups.forEach((set) => {
  total += set.size;
});

console.log(total);
