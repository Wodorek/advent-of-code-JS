const prepareInput = (str: string): [string, number][] => {
  return str.split('\n').map((el) => {
    const directive: string = el[0];
    const amount: number = +el.slice(1);

    return [directive, amount] as [string, number];
  });
};

export default prepareInput;
