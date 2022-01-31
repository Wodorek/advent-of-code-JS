const prepareInput = (input: string) => {
  return input.split('\n').map((el) => {
    const split = el.split(' ');
    return [
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
