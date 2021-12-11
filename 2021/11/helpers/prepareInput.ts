const prepareInput = (str: string) => {
  return str.split('\n').map((el) => {
    return el.split('').map(Number);
  });
};

export default prepareInput;
