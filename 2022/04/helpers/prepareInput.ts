function prepareInput(input: string) {
  return input.split('\n').map((line) => {
    const split = line.split(',');

    return [split[0].split('-').map(Number), split[1].split('-').map(Number)];
  });
}

export default prepareInput;
