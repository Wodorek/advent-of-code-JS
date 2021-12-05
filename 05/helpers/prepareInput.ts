const prepareInput = (str: string) => {
  return str.split('\n').map((el) => {
    const split = el.split(' -> ');
    return [split[0].split(','), split[1].split(',')];
  });
};

export default prepareInput;
