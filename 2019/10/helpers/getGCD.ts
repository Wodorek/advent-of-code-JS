function getGCD(a: number, b: number): number {
  if (!b) {
    return Math.abs(a);
  } else {
    return getGCD(b, a % b);
  }
}

export default getGCD;
