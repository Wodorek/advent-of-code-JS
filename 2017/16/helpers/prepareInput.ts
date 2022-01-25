const prepareInput = (input: string) => {
  return input.split(',').map((el) => {
    if (el[0] === 's') {
      return ['s', +el.slice(1)];
    }
    if (el[0] === 'x') {
      const split = el.replace('x', '').split('/');

      return ['x', +split[0], +split[1]];
    }
    if (el[0] === 'p') {
      const split = el.replace('p', '').split('/');
      return ['p', split[0], split[1]];
    }

    return [];
  });
};

export default prepareInput;
