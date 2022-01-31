const prepareInput = (input: string): [number, number[], number[]][] => {
  return input.split('\n').map((el) => {
    const split = el.split(' ');
    return [
      +split[0].slice(1),
      [
        ...split[2].split(',').map((el) => {
          return +el.replace(':', '');
        }),
      ],
      [...split[3].split('x').map(Number)],
    ];
  });
};

export default prepareInput;
