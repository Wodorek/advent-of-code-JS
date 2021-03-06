const prepareInput = (input: string) => {
  const split = input.split('\n');

  const firstSeparator = split.indexOf('');
  const secondSeparator = split.indexOf('', firstSeparator + 1);

  const fields = split.slice(0, firstSeparator).map((el) => {
    const split = el.split(' ');
    const mod = split[0][split[0].length - 1] === ':' ? 0 : 1;
    return [
      mod === 1 ? `${split[0]} ${split[1]}` : split[0],
      split[1 + mod].split('-').map(Number),
      split[3 + mod].split('-').map(Number),
    ];
  });

  const myTicket = split.slice(firstSeparator + 1, secondSeparator);

  const nearbyTickets = [];

  for (let i = secondSeparator + 2; i < split.length; i++) {
    const el = split[i];

    nearbyTickets.push(el.split(',').map(Number));
  }

  return [fields, myTicket[1].split(',').map(Number), nearbyTickets] as [
    [string, number[], number[]][],
    number[],
    number[][]
  ];
};

export default prepareInput;
