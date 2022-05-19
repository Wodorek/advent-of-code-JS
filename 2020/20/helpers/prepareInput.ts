function prepareInput(input: string) {
  const split = input.split('\n');
  const tiles: { [key: string]: string[] } = {};

  let currId = '';
  let lines: string[] = [];
  split.forEach((line) => {
    if (line[0] === 'T') {
      currId = line.split(' ')[1].replace(':', '');
    } else if (line === '') {
      tiles[currId] = lines;
      lines = [];
    } else {
      lines.push(line);
    }
  });
  tiles[currId] = lines;

  return tiles;
}

export default prepareInput;
