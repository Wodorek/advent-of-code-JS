const prepareInput = (input: string) => {
  return input.split('\t').map(Number);
};

export default prepareInput;
