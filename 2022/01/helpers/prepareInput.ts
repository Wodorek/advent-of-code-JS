function prepareInput(input: string) {
  return input.split('\n\n').map((inp) => inp.split('\n').map(Number));
}

export default prepareInput;
