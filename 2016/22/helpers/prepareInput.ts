const prepareInput = (input: string) => {
  return input.split('\n').map((el) => {
    const split = el.split(' ').filter((el) => {
      return el !== '';
    });
    const id = split[0].replace('/dev/grid/node-', '').split('-');
    return [
      [+id[0].replace('x', ''), +id[1].replace('y', '')],
      +split[1].replace('T', ''),
      +split[2].replace('T', ''),
      +split[3].replace('T', ''),
      +split[4].replace('%', ''),
    ];
  }) as [[number, number], number, number, number, number][];
};

export default prepareInput;
