import input from '../input';

const isWall = (x: number, y: number) => {
  const num = x * x + 3 * x + 2 * x * y + y + y * y + input;

  const binary = num.toString(2);

  const count = binary.split('1').length - 1;

  return count % 2 !== 0;
};

export default isWall;
