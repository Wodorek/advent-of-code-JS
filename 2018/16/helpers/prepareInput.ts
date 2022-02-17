const prepareInput = (input: string) => {
  const result = [];

  const split = input.split('\n').map((el) => {
    return el.match(/[0-9]+/g);
  });

  let item: number[][] = [];

  for (let i = 0; i < split.length + 1; i++) {
    const el = split[i];

    if (el === null) {
      result.push(item);
      item = [];
    } else {
      if (el !== undefined) {
        item.push(el.map(Number));
      }
    }
  }

  return result;
};

export default prepareInput;
