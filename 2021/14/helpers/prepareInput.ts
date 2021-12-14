const prepareInput = (str: string) => {
  const split = str.split('\n');

  const prepared: [string, { [key: string]: string }] = ['', {}];

  prepared[0] = split[0];

  for (let i = 2; i < split.length; i++) {
    const element = split[i].split(' -> ');

    prepared[1][element[0]] = element[1];
  }

  return prepared;
};

export default prepareInput;
