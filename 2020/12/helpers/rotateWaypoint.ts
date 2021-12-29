const rotateWaypoint = (
  arr: number[],
  rotation: number,
  direction: 'L' | 'R'
) => {
  const rotateBy = rotation / 90;

  if (direction === 'L') {
    for (let i = 0; i < rotateBy; i++) {
      const elem = arr.shift()!;
      arr.push(elem * -1);
    }
  } else {
    for (let i = 0; i < rotateBy; i++) {
      const elem = arr.pop()!;
      arr.unshift(elem * -1);
    }
  }

  return arr;
};

export default rotateWaypoint;
