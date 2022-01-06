const prepareInput = (input: string) => {
  const split = input.split('\n');
  const trasformations = [];
  let molecule = '';

  for (let i = 0; i < split.length; i++) {
    const line = split[i];

    if (line === '') {
      continue;
    }

    if (line.includes('=>')) {
      const transform = line.split(' => ');
      trasformations.push([transform[0], transform[1]]);
    } else {
      molecule = line;
    }
  }

  return [trasformations, molecule] as [string[][], string];
};

export default prepareInput;
