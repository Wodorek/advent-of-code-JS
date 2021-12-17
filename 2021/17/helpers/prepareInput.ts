const prepareInput = (str: string) => {
  const split = str.split(' ');
  let x = split[2];
  let y = split[3];

  x = x.replace('x=', '');
  y = y.replace('y=', '');

  return [
    [+x.split('..')[0], +x.split('..')[1].replace(',', '')],
    [+y.split('..')[0], +y.split('..')[1]],
  ];
};

export default prepareInput;
