function prepareInput(input: string) {
  return input.split('\n').map((line) => line.split('').map(Number));
}

export default prepareInput;
