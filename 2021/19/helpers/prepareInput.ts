type Point = [x: number, y: number, z: number];

function prepareInput(input: string): Point[][] {
  const split = input.split('\n').filter((el) => {
    return el !== '';
  });

  const scanners: Point[][] = [];

  let scanner: Point[] = [];

  for (let i = 0; i < split.length; i++) {
    const element = split[i];

    if (element.slice(0, 2) === '--') {
      if (scanner.length !== 0) {
        scanners.push(scanner);
        scanner = [];
      }

      continue;
    }

    const positions = element.split(',');
    scanner.push([+positions[0], +positions[1], +positions[2]]);
  }

  scanners.push(scanner);
  return scanners;
}

export default prepareInput;
