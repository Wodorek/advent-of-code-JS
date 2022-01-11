const prepareInput = (input: string) => {
  return input.split('\n').map((el) => {
    const split = el.split(' ');
    const identifier = [split[0], +split[1]];

    if (identifier[0] === 'bot') {
      return [identifier, [split[5], +split[6]], [split[10], +split[11]]];
    } else {
      return [identifier, [split[4], +split[5]]];
    }
  });
};

export default prepareInput;
