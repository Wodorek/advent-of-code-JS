const prepareInput = (input: string) => {
  const split = input.split('\n');
  const data = split.map((el) => {
    el = el.replace('turn ', '');

    const splitLine = el.split(' ');
    return [
      splitLine[0],
      [
        splitLine[1].split(',').map(Number),
        splitLine[3].split(',').map(Number),
      ],
    ];
  });
  return data as [string, number[][][]];
};

export default prepareInput;
