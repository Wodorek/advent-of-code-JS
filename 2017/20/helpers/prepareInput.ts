const prepareInput = (input: string) => {
  return input.split('\n').map((el) => {
    return el.split(', ').map((el) => {
      const slice = el.slice(3, el.length - 1).split(',');
      return [+slice[0], +slice[1], +slice[2]];
    });
  });
};

export default prepareInput;
