const prepareInput = (input: string) => {
  return input
    .replaceAll(',', '')
    .split('\n')
    .map((el) => {
      const split = el.split(' ');

      if (split.length === 3) {
        return [split[0], [split[1], split[2]]];
      } else {
        return [split[0], split[1]];
      }
    });
};

export default prepareInput;
