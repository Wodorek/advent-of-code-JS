type Vault = string[][];
type Keys = { [key: string]: any };

const parseLine = (
  [v, keys, entrances]: [Vault, Keys, string[]],
  l: string,
  y: number
) => {
  const contents = l.split('');
  contents.forEach((c, x) => {
    if (isKey(c)) {
      keys[c] = buildKey([x, y]);
    } else if (c === ENTRANCE) {
      const entrance = entrances.length.toString();
      keys[entrance] = buildKey([x, y]);
      entrances.push(entrance);
    }
  });
  v.push(contents);
  return [v, keys, entrances] as [Vault, Keys, string[]];
};

function prepareInput(ip: string) {
  return ip
    .split('\n')
    .reduce(parseLine, [[], {}, []] as [Vault, Keys, string[]]);
}

export default prepareInput;
