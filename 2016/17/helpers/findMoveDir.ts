const findMoveDir = (from: [number, number], to: [number, number]) => {
  if (to[0] > from[0]) {
    return 'R';
  }

  if (to[0] < from[0]) {
    return 'L';
  }

  if (to[1] > from[1]) {
    return 'D';
  }

  if (to[1] < from[1]) {
    return 'U';
  }

  return 'x';
};
export default findMoveDir;
