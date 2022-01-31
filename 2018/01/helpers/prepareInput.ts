const prepareInput = (input: string) => {
  return input.split('\n').map((el) => {
    if (el[0] === '+') {
      return +el.slice(1);
    } else {
      return +el;
    }
  });
};

export default prepareInput;
