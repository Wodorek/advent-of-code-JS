function prepareInput(input: string) {
  const split = input.split('\n');

  const bindTo = split[0][split[0].length - 1];

  const instructions = split.slice(1).map((el) => {
    const splitInst = el.split(' ');
    return [splitInst[0], +splitInst[1], +splitInst[2], +splitInst[3]];
  });

  return [+bindTo, instructions] as [
    number,
    [string, number, number, number][]
  ];
}

export default prepareInput;
