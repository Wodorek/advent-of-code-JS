function prepareInput(input: string) {
  return input
    .replaceAll('$ ', '')
    .split('\n')
    .map((line) => line.split(' '));
}

export default prepareInput;
