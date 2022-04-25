import findDisplaySize from './findDisplaySize';

function drawDisplay(grid: number[][]) {
  const tiles = {
    0: '.',
    1: '|',
    2: 'b',
    3: '-',
    4: 'o',
  };

  const [maxX, maxY] = findDisplaySize(grid);

  const display: string[][] = [];
  display.length = maxY + 1;

  display.fill(new Array(maxX + 1).fill('.'));

  grid.forEach((tile) => {
    display[tile[1]][tile[0]] = tiles[tile[2] as keyof typeof tiles];
  });

  display.forEach((line) => {
    console.log(line.join(' '));
  });
}
export default drawDisplay;
