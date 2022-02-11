const prepareInput = (input: string) => {
  const split = input.split(' ');

  return [+split[0], +split[6]];
};

export default prepareInput;
