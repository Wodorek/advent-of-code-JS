const prepareInput = (input: string) => {
  return input.split('\n').map((el) => {
    const split = el.split('-');
    const checksum = split.pop()!;
    const finished = checksum.replace(']', '').split('[');

    return [split, [+finished[0], finished[1]]];
  }) as [string[], [number, string]][];
};

export default prepareInput;
