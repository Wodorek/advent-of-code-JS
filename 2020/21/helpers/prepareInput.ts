function prepareInput(input: string) {
  const split = input.split('\n');

  return split.map((el) => {
    const [ingredients, allergens] = el.split('(');

    return [
      ingredients.split(' ').filter((el) => el !== ''),
      allergens
        .replaceAll(')', '')
        .replaceAll(',', '')
        .split(' ')
        .filter((el) => el !== 'contains'),
    ];
  });
}

export default prepareInput;
