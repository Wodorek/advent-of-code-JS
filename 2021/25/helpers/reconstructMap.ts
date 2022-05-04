interface PositionMap {
  right: string[];
  down: string[];
}

export function reconstructMap(
  positions: PositionMap,
  height: number,
  width: number
) {
  const map: string[][] = [];

  for (let i = 0; i < height; i++) {
    const arr: string[] = [];

    arr.length = width;
    arr.fill('.');

    console.log(arr);
    map.push(arr);
  }

  positions.down.forEach((down) => {
    const [x, y] = down.split(',').map(Number);
    console.log(x, y);
    map[y][x] = 'v';
  });

  console.log(map);

  positions.right.forEach((right) => {
    const [x, y] = right.split(',').map(Number);
    map[y][x] = '>';
  });

  console.log(map);

  return map;
}
