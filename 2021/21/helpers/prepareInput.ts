const prepareInput = (str: string) => {
  const split = str.split('\n');

  return [+split[0][split[0].length - 1], +split[1][split[1].length - 1]];
};

export default prepareInput;
