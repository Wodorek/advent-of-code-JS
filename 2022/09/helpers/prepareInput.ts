function prepareInput(input: string) {
  return input.split('\n').map((el) => {
    const split = el.split(' ');

    return [split[0], +split[1]];
  }) as [string, number][];
}

export default prepareInput;
