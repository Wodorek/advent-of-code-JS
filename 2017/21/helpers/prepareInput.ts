const prepareInput = (input: string) => {
  const lookup: string[] = [];
  const outputs: string[] = [];

  input.split('\n').map((el) => {
    const split = el.split(' => ');
    lookup.push(split[0]);
    outputs.push(split[1]);
  });

  return [lookup, outputs];
};

export default prepareInput;
