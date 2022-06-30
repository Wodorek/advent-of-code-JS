function prepareInput(input: string): [string, number][] {
  const split = input.split('\n').map((el) => {
    const splitEl = el.split(' ');

    if (!splitEl[2]) {
      return ['CUT', +splitEl[1]] as [string, number];
    } else {
      if (splitEl[2] === 'new') {
        return ['NEW', -1] as [string, number];
      } else {
        return ['INC', +splitEl[3]] as [string, number];
      }
    }
  });

  return split;
}
export default prepareInput;
