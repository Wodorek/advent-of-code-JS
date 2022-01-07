const prepareInput = (input: string) => {
  return input.split('\n').map((el) => {
    const from = el.split(' to ');
    const [to, time] = from[1].split(' = ');

    return [from[0], to, +time];
  }) as [string, string, number][];
};

export default prepareInput;
