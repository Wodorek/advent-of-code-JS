import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const priorityQueue =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function findCommonItem(rucksack: string) {
  const comp1 = rucksack.slice(0, rucksack.length / 2).split('');
  const comp2 = rucksack.slice(rucksack.length / 2).split('');

  const commonValue = comp1.filter((val) => comp2.indexOf(val) > -1)[0];

  return commonValue;
}

function getPriority(item: string) {
  return priorityQueue.indexOf(item) + 1;
}

function getCommonValue(rucksack: string) {
  const commonItem = findCommonItem(rucksack);
  const priority = getPriority(commonItem);

  return priority;
}

let score = 0;

inputArr.forEach((rucksack) => {
  score += getCommonValue(rucksack);
});

console.log(score);
