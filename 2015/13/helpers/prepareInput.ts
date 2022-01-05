const prepareInput = (input: string) => {
  return input.split('\n').map((el) => {
    const split = el.split(' ');

    return [
      split[0],
      split[split.length - 1].replace('.', ''),
      split[2] === 'gain' ? 1 : -1,
      +split[3],
    ];
  }) as [string, string, number, number][];
};

export default prepareInput;
