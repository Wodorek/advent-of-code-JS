const prepareInput = (input: string) => {
  return input.split('\n').map((el) => {
    const split = el.split(' ');

    return [split[0], +split[3], +split[6], +split[split.length - 2]];
  }) as [string, number, number, number][];
};

export default prepareInput;
