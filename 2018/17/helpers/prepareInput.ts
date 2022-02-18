const prepareInput = (input: string) => {
  return input.split('\n').map((el) => {
    const split = el.split(', ');

    const point = split[0].slice(2);
    const range = split[1].slice(2).split('..');

    return [split[0][0], +point, split[1][0], +range[0], +range[1]];
  }) as [string, number, string, number, number][];
};

export default prepareInput;
