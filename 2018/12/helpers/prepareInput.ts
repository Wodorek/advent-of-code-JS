const prepareInput = (input: string): [string, { [key: string]: string }] => {
  const split = input.split('\n');

  const lookup: { [key: string]: string } = {};

  for (let i = 2; i < split.length; i++) {
    const el = split[i].split(' => ');

    lookup[el[0]] = el[1];
  }

  return [split[0].replace('initial state: ', ''), lookup];
};

export default prepareInput;
