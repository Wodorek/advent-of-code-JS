const prepareInput = (input: string) => {
  return input.split('\n').map((el) => {
    const split = el.split(' ');

    if (split[0] === 'swap') {
      return [split[0], split[2], split[5]];
    }

    if (split[0] === 'reverse') {
      return [split[0], +split[2], +split[4]];
    }

    if (split[0] === 'rotate') {
      if (split[1] === 'based') {
        return [split[0], split[6]];
      } else {
        return [split[0], split[1], +split[2]];
      }
    }

    if (split[0] === 'move') {
      return [split[0], +split[2], +split[5]];
    }
  });
};

export default prepareInput;
