import prepareInput from './helpers/prepareInput';
import input from './input';

const inputArr = prepareInput(input);

const bagChains: { [key: string]: string[] } = {};

inputArr.forEach((line) => {
  const split = line.split('contain');
  const key = split[0].replace(' bags ', '');
  let contains = split[1].split(',');
  contains = contains.map((el) => {
    return el
      .replace(/(bags|bag)/g, '')
      .replace('.', '')
      .replace(/[0-9]/g, '')
      .trim();
  });
  contains.forEach((bag) => {
    if (!bagChains[key]) {
      bagChains[key] = [];
    }
    bagChains[key].push(bag);
  });
});

const bags = Object.keys(bagChains);

let found = 0;

const findIfIncludes = (lookFrom: string, lookFor: string) => {
  const queue: string[] = [];

  queue.push(...bagChains[lookFrom]);

  while (queue.length > 0) {
    const curr = queue.pop()!;

    if (curr === lookFor) {
      return found++;
    } else if (curr === 'no other') {
      continue;
    } else {
      queue.push(...bagChains[curr]);
    }
  }
};

bags.forEach((bag) => {
  findIfIncludes(bag, 'shiny gold');
});

console.log(found);
