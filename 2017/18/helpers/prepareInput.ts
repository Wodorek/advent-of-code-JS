const prepareInput = (input: string) => {
  return input.split('\n').map((line) => {
    const split = line.split(' ');

    if (split[2]) {
      return [split[0], split[1], split[2]];
    } else {
      return [split[0], split[1]];
    }
  });
};

export default prepareInput;
