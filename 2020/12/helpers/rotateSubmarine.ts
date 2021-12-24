const rotateSubmarine = (
  direction: 'S' | 'N' | 'E' | 'W',
  rotation: number,
  rotateTo: 'L' | 'R'
) => {
  const possible = ['N', 'E', 'S', 'W'];
  const directionIdx = possible.indexOf(direction);

  const side = rotateTo === 'L' ? -1 : 1;

  const changeIndex = rotation / 90;

  let newIdx = directionIdx + changeIndex * side;

  if (newIdx > 3) {
    newIdx -= 4;
  }

  if (newIdx < 0) {
    newIdx += 4;
  }

  return possible[newIdx] as 'S' | 'N' | 'E' | 'W';
};

export default rotateSubmarine;
