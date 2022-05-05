type Point = [x: number, y: number, z: number];

export function isNear(a: Point, b: Point) {
  if (Math.abs(a[0] - b[0]) > 1000) return false;
  if (Math.abs(a[1] - b[1]) > 1000) return false;
  if (Math.abs(a[2] - b[2]) > 1000) return false;
  return true;
}
