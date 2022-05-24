import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

let ingredientsMap: {
  [key: string]: {
    timesSeen: number;
    possibleNames: {
      [key: string]: number;
    };
  };
} = {};

inputArr.forEach((food) => {
  const [ingredients, allergens] = food;

  allergens.forEach((allergen) => {
    if (ingredientsMap[allergen]) {
      ingredientsMap[allergen].timesSeen++;
    } else {
      ingredientsMap[allergen] = { timesSeen: 1, possibleNames: {} };
    }
    ingredients.forEach((ingredient) => {
      if (ingredientsMap[allergen].possibleNames[ingredient]) {
        ingredientsMap[allergen].possibleNames[ingredient]++;
      } else {
        ingredientsMap[allergen].possibleNames[ingredient] = 1;
      }
    });
  });
});

const allergens = Object.keys(ingredientsMap);

allergens.forEach((allergen) => {
  const names = Object.keys(ingredientsMap[allergen].possibleNames);

  names.forEach((name) => {
    if (
      ingredientsMap[allergen].possibleNames[name] !==
      ingredientsMap[allergen].timesSeen
    ) {
      delete ingredientsMap[allergen].possibleNames[name];
    }
  });
});

const possiblyAllergic = new Set<string>();

allergens.forEach((allergen) => {
  const possible = Object.keys(ingredientsMap[allergen].possibleNames);

  possible.forEach((ing) => {
    possiblyAllergic.add(ing);
  });
});

let allIngredients: string[] = [];

inputArr.forEach((food) => {
  allIngredients.push(...food[0]);
});

allIngredients = allIngredients.filter((el) => {
  return !possiblyAllergic.has(el);
});

console.log(allIngredients.length);
