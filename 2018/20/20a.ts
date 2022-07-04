import input from './input';

function processRoute(route: string) {
  const directions = route.split('');

  let currentPosition = [0, 0];

  const stack = [currentPosition];

  const distances: { [key: string]: number } = {};

  distances['0,0'] = 0;

  function move(dx: number, dy: number) {
    const currentDistance =
      distances[`${currentPosition[0]},${currentPosition[1]}`];

    currentPosition[0] += dx;
    currentPosition[1] += dy;

    distances[`${currentPosition[0]},${currentPosition[1]}`] =
      currentDistance + 1;
  }

  directions.forEach((direction) => {
    if (direction === 'N') {
      move(-1, 0);
    } else if (direction === 'S') {
      move(1, 0);
    } else if (direction === 'E') {
      move(0, 1);
    } else if (direction === 'W') {
      move(0, -1);
    } else if (direction === '(') {
      stack.push(currentPosition.map((el) => el));
    } else if (direction === ')') {
      currentPosition = stack.pop()!;
    } else if (direction === '|') {
      currentPosition = stack[stack.length - 1];
    }
  });
}

processRoute(input);
