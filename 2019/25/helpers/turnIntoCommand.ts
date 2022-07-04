function turnIntoCommand(command: string) {
  const noSpaces = command.split('');

  const asCommand: number[] = [];

  noSpaces.forEach((char) => {
    asCommand.push(char.charCodeAt(0));
  });

  asCommand.push(10);

  return asCommand;
}
export default turnIntoCommand;
