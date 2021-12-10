const prepareInput = (string: string) => {
  return string.split('\n').map((el) => {
    const split = el.split(': ');

    const policy = split[0].split(' ');
    const ranges = policy[0].split('-');

    return {
      min: +ranges[0],
      max: +ranges[1],
      pass: split[1],
      letter: policy[1],
    };
  });
};

export default prepareInput;
