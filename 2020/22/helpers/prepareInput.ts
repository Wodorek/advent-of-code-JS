function prepareInput(input: string) {
  const split = input.split('\n');

  let deck: number[] = [];

  const decks: number[][] = [];

  split.forEach((el) => {
    if (el === '') {
      decks.push(deck);
      deck = [];
    } else if (!isNaN(+el)) {
      deck.push(+el);
    }
  });

  decks.push(deck);

  return decks;
}

export default prepareInput;
