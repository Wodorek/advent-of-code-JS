const prepareInput = (input: string) => {
  const commandRegex = /[A-Z]+/g;
  const argsRegex = /[a-z0-9]+/g;

  const split = input.split('\n');

  const arr = split.map((el) => {
    const args = el.match(argsRegex);
    const command = el.match(commandRegex);
    return [command ? command[0] : 'PROVIDE', args];
  });

  return arr as [string, string[]][];
};

export default prepareInput;
