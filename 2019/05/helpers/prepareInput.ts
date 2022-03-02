const prepareInput = (input: string) => {
  return input.split(',').map(Number);
};

export default prepareInput;
