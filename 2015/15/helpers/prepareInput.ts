import { ingredient } from './interfaces';

const prepareInput = (input: string) => {
  const ingredients: { [key: string]: ingredient } = {};

  input.split('\n').forEach((line) => {
    const elements = line.replaceAll(',', '').replace(':', '').split(' ');

    const ingredient: ingredient = {
      capacity: +elements[2],
      durability: +elements[4],
      flavor: +elements[6],
      texture: +elements[8],
      calories: +elements[10],
    };

    ingredients[elements[0]] = ingredient;
  });

  return ingredients;
};

export default prepareInput;
