function prepareInput(input: string) {
  return input.split('\n').map((el) => el.split(',').map(Number));
}

export default prepareInput;
