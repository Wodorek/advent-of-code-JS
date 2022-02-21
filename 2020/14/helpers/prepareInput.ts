const prepareInput = (input: string) => {
  return input.split('\n').map((el) => {
    const split = el.split(' = ');

    if (split[0][1] === 'a') {
      return ['mask', split[1]];
    } else {
      return ['mem', `${split[0].slice(4, split[0].length - 1)},${split[1]}`];
    }
  });
};

export default prepareInput;
