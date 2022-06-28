import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const productionLookup: {
  [key: string]: {
    ingredients: [number, string][];

    prodQuant: number;
  };
} = {};

const leftovers: { [key: string]: number } = {};

inputArr.forEach((reaction) => {
  const produces = reaction[1][1];
  const productionQuant = reaction[1][0];

  const ingredients: [number, string][] = [];

  reaction[0].forEach((ing) => {
    ingredients.push([ing[0], ing[1]] as [number, string]);
  });

  leftovers[produces] = 0;

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

let oreRequired = 0;

function produceChemical(chemical: string, quantity: number) {
  const requiredIngrediends = productionLookup[chemical].ingredients;

  let requiredProduction = quantity;

  if (leftovers[chemical] > 0) {
    if (leftovers[chemical] >= requiredProduction) {
      leftovers[chemical] -= requiredProduction;
      return;
    } else {
      requiredProduction -= leftovers[chemical];
      leftovers[chemical] = 0;
    }
  }

  const cyclesRequired = Math.ceil(
    requiredProduction / productionLookup[chemical].prodQuant
  );

  const leftover =
    cyclesRequired * productionLookup[chemical].prodQuant - requiredProduction;

  leftovers[chemical] += leftover;

  if (requiredIngrediends[0][1] === 'ORE') {
    oreRequired +=
      cyclesRequired * productionLookup[chemical].ingredients[0][0];
  } else {
    requiredIngrediends.forEach((ing) => {
      produceChemical(ing[1], ing[0] * cyclesRequired);
    });
  }
}

produceChemical('FUEL', 1);

console.log(oreRequired);
