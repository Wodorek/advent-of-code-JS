const prepareInput = (input: string) => {
  return input.split('\n').map((el) => {
    const split = el.split('x');
    return split.map(Number);
  });
};

export default prepareInput;
