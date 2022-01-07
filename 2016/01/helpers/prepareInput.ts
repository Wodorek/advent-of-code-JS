const prepareInput = (input: string) => {
  return input.split(', ').map((el) => {
    const direction = el.slice(0, 1);
    const steps = +el.slice(1);

    return [direction, steps];
  }) as ['L' | 'R', number][];
};

export default prepareInput;
