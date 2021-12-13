import prepareInput from './helpers/prepareInput';
import input from './input';

const inputArr = prepareInput(input);

const bagChains: { [key: string]: string[][] } = {};

inputArr.forEach((line) => {
  const split = line.split('contain');
  const key = split[0].replace(' bags ', '');
  let contains = split[1].split(',');
  contains = contains.map((el) => {
    return el
      .replace(/(bags|bag)/g, '')
      .replace('.', '')

      .trim();
  });
  contains.forEach((bag) => {
    if (!bagChains[key]) {
      bagChains[key] = [];
    }
    const split = [bag.slice(2, bag.length), bag.slice(0, 1)];
    bagChains[key].push([split[0], split[1]]);
  });
});

let count = 0;

const countBags = (color = 'shiny gold', multiplier = 1) => {
  const contains = bagChains[color];

  contains.forEach((bag) => {
    if (bag[1] === 'n') {
      return;
    }

    count += +bag[1] * multiplier;
    countBags(bag[0], +bag[1] * multiplier);
  });
};

countBags();

console.log(count);
