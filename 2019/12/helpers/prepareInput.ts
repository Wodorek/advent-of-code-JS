function prepareInput(input: string) {
  const split = input.split('\n');

  const planets: number[][] = [];

  split.forEach((planet) => {
    const coords: number[] = [];

    const frags = planet.split('=');

    coords.push(+frags[1].split(',')[0]);
    coords.push(+frags[2].split(',')[0]);
    coords.push(parseInt(frags[3].slice(0, frags[3].length - 1)));

    planets.push(coords);
  });

  return planets;
}

export default prepareInput;
