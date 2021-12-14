const prepareInput = (str: string): [string, number][] => {
  return str.split('\n').map((el) => {
    const split = el.split(' ');

    const parsedInt =
      split[1].slice(0, 1) === '+'
        ? +split[1].slice(1, split[1].length)
        : +split[1].slice(1, split[1].length) * -1;

    return [split[0], parsedInt];
  });
};

export default prepareInput;
