import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const [rules, messages] = inputArr;

const parsedRules: { [key: number]: number[][] } = {};
const basicBlocks: { [key: number]: string } = {};

rules.forEach((rule) => {
  const split = rule.split(':');
  const id = +split[0];
  const subRules = split[1].split(' ').slice(1);
  let currSet: number[] = [];

  console.log(subRules[0]);

  if (subRules[0] === '"a"' || subRules[0] === '"b"') {
    console.log('he');
    basicBlocks[id] = eval(subRules[0]);
    return;
  }

  parsedRules[id] = [];

  subRules.forEach((subRule) => {
    if (!isNaN(+subRule)) {
      currSet.push(+subRule);
    } else if (subRule === '|') {
      parsedRules[id].push(currSet);
      currSet = [];
    }
  });

  parsedRules[id].push(currSet);
});

console.log(parsedRules);
console.log(eval(`${parsedRules[1]}`));
console.log(basicBlocks);

function destructureRule(id: number) {
  const rule = parsedRules[id];
}
