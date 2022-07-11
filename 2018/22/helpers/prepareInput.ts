function prepareInput(input: string) {
  const split = input.split('\n');

  return [
    +split[0].split(' ')[1],
    +split[1].split(' ')[1].split(',')[0],
    +split[1].split(' ')[1].split(',')[1],
  ];
}

export default prepareInput;
