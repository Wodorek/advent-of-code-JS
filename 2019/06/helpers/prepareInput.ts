const prepareInput = (input: string) => {
  return input.split('\n').map((el) => {
    return el.split(')');
  });
};

export default prepareInput;
