const prepareInput = (input: string) => {
  return input.split('\n').map((line) => {
    const split = line.split(' ');

    return [split[1], split[0], split[2], split[4], split[5], split[6]];
  });
};

export default prepareInput;
