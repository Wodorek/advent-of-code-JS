const draw = (input: number[][]) => {
  const xs: number[] = [];
  const ys: number[] = [];

  input.forEach((dot) => {
    xs.push(dot[0]);
    ys.push(dot[1]);
  });

  const width = Math.max(...xs) + 1;
  const height = Math.max(...ys) + 1;

  console.log(width, ' x ', height);

  const display: string[][] = [];

  for (let i = 0; i < height; i++) {
    const line = [];

    for (let j = 0; j < width; j++) {
      line.push(' ');
    }
    display.push(line);
  }

  input.forEach((dot) => {
    display[dot[1]][dot[0]] = '#';
  });

  display.forEach((line) => {
    console.log(line.join(''));
  });
};

export default draw;
