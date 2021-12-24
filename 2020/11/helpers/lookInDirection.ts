const lookInDirection = (
  arr: string[],
  row: number,
  column: number,
  move: number[]
) => {
  let currentItem = '';
  let idx = 1;

  let found = false;
  while (!found) {
    currentItem = arr?.[row + move[0] * idx]?.[column + move[1] * idx];
    idx++;

    if (
      currentItem === '#' ||
      currentItem === undefined ||
      currentItem === 'L'
    ) {
      found = true;
    }
  }

  return currentItem;
};

export default lookInDirection;
