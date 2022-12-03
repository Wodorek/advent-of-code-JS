import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const priorityQueue =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function findCommonItems(rucksack1: string, rucksack2: string) {
  const comp1 = rucksack1.split('');
  const comp2 = rucksack2.split('');

  const commonValues = comp1.filter((val) => comp2.indexOf(val) > -1);

  return commonValues;
}

function getPriority(item: string) {
  return priorityQueue.indexOf(item) + 1;
}

function getCommonValue(group: string[]) {
  const twoShared = findCommonItems(group[0], group[1]).join('');
  const commonItem = findCommonItems(twoShared, group[2]);

  const priority = getPriority(commonItem[0]);

  return priority;
}

const chunkedArr: string[][] = [];

for (let i = 0; i < inputArr.length; i += 3) {
  chunkedArr.push(inputArr.slice(i, i + 3));
}

let score = 0;

chunkedArr.forEach((group) => {
  score += getCommonValue(group);
});

console.log(score);
