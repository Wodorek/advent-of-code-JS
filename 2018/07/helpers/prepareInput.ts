const prepareInput = (input: string) => {
  return input.split('\n').map((el) => {
    const split = el.split(' ');

    return [split[1], split[7]];
  });
};

export default prepareInput;
