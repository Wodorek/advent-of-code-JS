import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const presentAunt = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1,
};

let matchingAunts = inputArr;

Object.keys(presentAunt).forEach((key) => {
  matchingAunts = matchingAunts.filter((aunt) => {
    const auntKeys = Object.keys(aunt);
    const idx = key as keyof typeof presentAunt;

    if (!auntKeys.includes(key)) {
      return true;
    } else {
      if (aunt[key] === presentAunt[idx]) {
        return true;
      }
      return false;
    }
  });
});

console.log(matchingAunts[0].id);
