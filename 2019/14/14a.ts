import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const productionLookup: {
  [key: string]: {
    ingredients: [number, string][];

    prodQuant: number;
  };
} = {};

inputArr.forEach((reaction) => {
  const produces = reaction[1][1];
  const productionQuant = reaction[1][0];

  const ingredients: [number, string][] = [];

  reaction[0].forEach((ing) => {
    ingredients.push([ing[0], ing[1]] as [number, string]);
  });

  productionLookup[produces] = {
    ingredients,
    prodQuant: productionQuant,
  };
});

const basicsIngredients: string[] = [];

for (let key in productionLookup) {
  if (productionLookup[key].ingredients[0][1] === 'ORE') {
    basicsIngredients.push(key);
  }
}

const totalsNeeded: { [key: string]: number } = {};
totalsNeeded['FUEL'] = 1;

while (
  JSON.stringify(Object.keys(totalsNeeded).sort()) !==
  JSON.stringify(basicsIngredients.sort())
) {
  const toProcess = Object.keys(totalsNeeded).filter((el) => {
    return !basicsIngredients.includes(el);
  });

  toProcess.forEach((ing) => {
    const produces = productionLookup[ing].prodQuant;

    let runTimes = 1;

    if (produces < totalsNeeded[ing]) {
      runTimes = Math.ceil(totalsNeeded[ing] / produces);
    }

    productionLookup[ing].ingredients.forEach((ingredient) => {
      if (totalsNeeded[ingredient[1]]) {
        totalsNeeded[ingredient[1]] += ingredient[0] * runTimes;
      } else {
        totalsNeeded[ingredient[1]] = ingredient[0] * runTimes;
      }
    });

    delete totalsNeeded[ing];
  });
}

console.log(totalsNeeded);

function convertToOre(ingredients: { [key: string]: number }) {
  let totalOre = 0;

  Object.keys(ingredients).forEach((ing) => {
    let produces = productionLookup[ing].prodQuant;

    const required = ingredients[ing];

    let makeTimes = 1;

    if (produces < required) {
      makeTimes = Math.ceil(required / produces);
    }

    totalOre += productionLookup[ing].ingredients[0][0] * makeTimes;
  });

  return totalOre;
}

console.log(convertToOre(totalsNeeded));
