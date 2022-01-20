const prepareInput = (input: string) => {
  return input.split('\n').map((el) => {
    return el.split('\t').map(Number);
  });
};

export default prepareInput;
