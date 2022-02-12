const prepareInput = (input: string) => {
  return input.split('\n').map((el) => {
    const matches = el.match(/-?\d+/g)!.map(Number);

    return matches;
  });
};

export default prepareInput;
