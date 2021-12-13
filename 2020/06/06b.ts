import prepareInput from './helpers/prepareInput';
import input from './input';

const inputArr = prepareInput(input);

const groups = [];
let group: { [key: string]: number } = { members: 0 };

for (let i = 0; i < inputArr.length; i++) {
  const element = inputArr[i];

  if (element === '') {
    groups.push(group);
    group = { members: 0 };
  } else {
    group['members']++;
    const split = element.split('');

    split.forEach((el) => {
      if (group[el]) {
        group[el] += 1;
      } else {
        group[el] = 1;
      }
    });
  }
}

let total = 0;

groups.forEach((group) => {
  const members = group['members'];
  delete group['members'];

  const answers = Object.keys(group);

  answers.forEach((answer) => {
    if (group[answer] === members) {
      total++;
    }
  });
});

console.log(total);
