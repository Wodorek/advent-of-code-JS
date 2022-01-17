const prepareInput = (input: string) => {
  return input.split('\n').map((line) => {
    const split = line.split('-');
    return [+split[0], +split[1]];
  });
};

export default prepareInput;
