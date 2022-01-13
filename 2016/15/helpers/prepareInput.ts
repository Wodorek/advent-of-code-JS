const prepareInput = (input: string) => {
  return input.split('\n').map((el) => {
    const split = el.split(' ');
    return [+split[1][1], +split[3], +split[split.length - 1].replace('.', '')];
  });
};

export default prepareInput;
