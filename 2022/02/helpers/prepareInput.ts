function prepareInput(input: string) {
  return input.split('\n').map((el) => el.split(' ')) as [
    'A' | 'B' | 'C',
    'X' | 'Y' | 'Z'
  ][];
}

export default prepareInput;
