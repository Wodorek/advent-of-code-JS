function prepareInput(input: string) {
  return input.split('\n').map((el) => {
    return +el.split(': ')[1];
  });
}

export default prepareInput;
