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

function produceChemical(chemical: string, quantity: number) {
  const requiredIngrediends = productionLookup[chemical].ingredients;

  console.log(requiredIngrediends, productionLookup[chemical].prodQuant);
}

produceChemical('FUEL', 1);
