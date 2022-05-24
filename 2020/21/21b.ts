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

const dictionary: { [key: string]: string } = {};

while (Object.keys(ingredientsMap).length > 0) {
  const keys = Object.keys(ingredientsMap);

  for (let i = 0; i < keys.length; i++) {
    const food = keys[i];
    const possibleNames = Object.keys(ingredientsMap[food].possibleNames);
    if (possibleNames.length === 1) {
      dictionary[food] = possibleNames[0];
      keys.forEach((key) => {
        delete ingredientsMap[key].possibleNames[possibleNames[0]];
      });
      delete ingredientsMap[food];
      break;
    }
  }
}

const sortedKeys = Object.keys(dictionary).sort();

const answer = sortedKeys
  .map((el) => {
    return dictionary[el];
  })
  .join(',');

console.log(answer);
