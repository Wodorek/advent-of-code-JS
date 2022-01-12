const prepareInput = (input: string) => {
  return input.split('\n').map((el) => {
    const split = el.split(' ');
    if (split[0] === 'inc' || split[0] === 'dec') {
      return [split[0], split[1]];
    } else {
      return [split[0], split[1], split[2]];
    }
  });
};

export default prepareInput;
