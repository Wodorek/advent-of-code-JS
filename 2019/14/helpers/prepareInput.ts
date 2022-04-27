function prepareInput(input: string) {
  const split = input.split('\n');

  return split.map((el) => {
    const reaction: [[number, string][], [number, string]] = [[], [0, '']];

    const chem = el.split(' => ');

    const product = chem[1].split(' ');

    reaction[1] = [parseInt(product[0]) as number, product[1] as string];

    const ingredients = chem[0].split(', ');

    ingredients.forEach((ingredient) => {
      const ing = ingredient.split(' ');

      reaction[0].push([parseInt(ing[0]), ing[1]]);
    });

    return reaction;
  });
}

export default prepareInput;
