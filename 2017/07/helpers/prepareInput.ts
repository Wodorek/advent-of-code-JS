const prepareInput = (input: string) => {
  return input.split('\n').map((el) => {
    const split = el.split(' -> ');

    if (!split[1]) {
      return [
        [
          split[0].split(' ')[0],
          split[0].split(' ')[1].replace('(', '').replace(')', ''),
        ],
      ];
    } else {
      return [
        [
          split[0].split(' ')[0],
          split[0].split(' ')[1].replace('(', '').replace(')', ''),
        ],
        [...split[1].split(', ')],
      ];
    }
  });
};

export default prepareInput;
