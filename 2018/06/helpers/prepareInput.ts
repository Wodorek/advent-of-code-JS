const prepareInput = (input: string) => {
  return input.split('\n').map((el) => {
    const split = el.split(', ').map(Number);

    return [split[0], split[1]];
  });
};

export default prepareInput;
