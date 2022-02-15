export {};

const input = '681901';

let recipes = [3, 7];

let elf1 = 0;
let elf2 = 1;
let recipesProduced = 0;

const produceRecipes = (recipe1: number, recipe2: number) => {
  const digits = recipes[recipe1] + recipes[recipe2];

  const asStr = digits.toString();

  recipes.push(...asStr.split('').map(Number));
  recipesProduced = asStr.length;

  elf1 += 1 + recipes[recipe1];
  elf2 += 1 + recipes[recipe2];

  while (elf1 > recipes.length - 1) {
    elf1 -= recipes.length;
  }

  while (elf2 > recipes.length - 1) {
    elf2 -= recipes.length;
  }
};

let produce = true;

while (produce) {
  produceRecipes(elf1, elf2);

  for (let i = recipes.length; i > recipes.length - recipesProduced; i--) {
    const slice = recipes.slice(i - input.length, i).join('');

    if (slice === input) {
      produce = false;
    }
  }
}

console.log(recipes.length - input.length - 1);
