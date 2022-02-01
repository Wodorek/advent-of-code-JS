const prepareInput = (input: string) => {
  return input.split('\n').map((el) => {
    const split = el.replace('[', '').replace(']', '').split(' ');

    return [
      split.slice(0, 2).join(' '),
      split[2] === 'Guard' ? split[3].replace('#', '') : split[2],
    ];
  });
};

export default prepareInput;
