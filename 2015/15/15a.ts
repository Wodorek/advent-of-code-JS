import input from './input';

import prepareInput from './helpers/prepareInput';
import { ingredient } from './helpers/interfaces';

const inputArr = prepareInput(input);

console.log(inputArr);

class Cookie {
  capacity: number;
  durability: number;
  flavor: number;
  texture: number;
  calories: number;

  constructor() {
    this.capacity = 0;
    this.durability = 0;
    this.flavor = 0;
    this.texture = 0;
    this.calories = 0;
  }

  addIngredient(ingredient: ingredient, times: number) {
    this.capacity += ingredient.capacity * times;
    this.durability += ingredient.durability * times;
    this.flavor += ingredient.flavor * times;
    this.texture += ingredient.texture * times;
    this.calories += ingredient.calories * times;
  }

  getScore() {
    if (
      this.capacity < 0 ||
      this.durability < 0 ||
      this.flavor < 0 ||
      this.texture < 0
    ) {
      return 0;
    }
    return this.capacity * this.durability * this.flavor * this.texture;
  }
}

const cookies: Cookie[] = [];

for (let sugars = 0; sugars < 100; sugars++) {
  for (let sprinkles = 0; sprinkles < 100 - sugars; sprinkles++) {
    for (let candies = 0; candies < 100 - sprinkles - sugars; candies++) {
      const cookie = new Cookie();

      cookie.addIngredient(inputArr.Sugar, sugars);
      cookie.addIngredient(inputArr.Sprinkles, sprinkles);
      cookie.addIngredient(inputArr.Candy, candies);
      cookie.addIngredient(
        inputArr.Chocolate,
        100 - sugars - sprinkles - candies
      );

      cookies.push(cookie);
    }
  }
}

let maxScore = 0;
let winningCookie = null;

cookies.forEach((cookie) => {
  if (cookie.getScore() > maxScore) {
    winningCookie = cookie;
  }
  maxScore = Math.max(maxScore, cookie.getScore());
});

console.log(maxScore);
console.log(winningCookie);
