export {};

const input = 681901;

let recipes = [3, 7];

let elf1 = 0;
let elf2 = 1;
let recipesProduced = 0;

const produceRecipes = (recipe1: number, recipe2: number) => {
  const digits = recipes[recipe1] + recipes[recipe2];

  const asStr = digits.toString();

  recipes.push(...asStr.split('').map(Number));
  recipesProduced += asStr.length;

  elf1 += 1 + recipes[recipe1];
  elf2 += 1 + recipes[recipe2];

  while (elf1 > recipes.length - 1) {
    elf1 -= recipes.length;
  }

  while (elf2 > recipes.length - 1) {
    elf2 -= recipes.length;
  }
};

const getScore = (recipes: number[], start: number) => {
  return recipes.slice(start, start + 10).join('');
};

while (recipesProduced < input + 10) {
  produceRecipes(elf1, elf2);
}

console.log(getScore(recipes, input));

console.log(`1617111014`.length);
