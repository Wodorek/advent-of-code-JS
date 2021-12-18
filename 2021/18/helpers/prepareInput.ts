const prepareInput = (str: string) => {
  return str.split('\n').map((el) => {
    return eval(el);
  });
};

export default prepareInput;
