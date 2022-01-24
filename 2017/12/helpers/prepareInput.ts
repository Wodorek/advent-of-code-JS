const prepareInput = (input: string) => {
  const obj: { [key: string]: number[] } = {};

  input.split('\n').forEach((el) => {
    const split = el.split(' <-> ');

    obj[split[0]] = split[1].split(', ').map(Number);
  });

  return obj;
};

export default prepareInput;
