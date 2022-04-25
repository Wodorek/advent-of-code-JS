import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

console.log(inputArr);

class Planet {
  position: {
    x: number;
    y: number;
    z: number;
  };
  velocity: {
    x: number;
    y: number;
    z: number;
  };

  constructor(position: number[]) {
    this.position = {
      x: position[0],
      y: position[1],
      z: position[2],
    };
    this.velocity = {
      x: 0,
      y: 0,
      z: 0,
    };
  }

  move() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.position.z += this.velocity.z;
  }

  applyGravity(positions: number[]) {
    const [x, y, z] = positions;

    if (this.position.x > x) {
      this.velocity.x--;
    } else if (this.position.x < x) {
      this.velocity.x++;
    }

    if (this.position.y > y) {
      this.velocity.y--;
    } else if (this.position.y < y) {
      this.velocity.y++;
    }

    if (this.position.z > z) {
      this.velocity.z--;
    } else if (this.position.z < z) {
      this.velocity.z++;
    }
  }

  get getEnergy() {
    const potential =
      Math.abs(this.position.x) +
      Math.abs(this.position.y) +
      Math.abs(this.position.z);

    const kinetic =
      Math.abs(this.velocity.x) +
      Math.abs(this.velocity.y) +
      Math.abs(this.velocity.z);

    return potential * kinetic;
  }
}

const planets: Planet[] = [];

inputArr.forEach((start) => {
  planets.push(new Planet(start));
});

function advanceTime(planets: Planet[]) {
  const notProcessed = [...planets];

  while (notProcessed.length > 0) {
    const toProcess = notProcessed.pop()!;

    notProcessed.forEach((planet) => {
      const planetPos = planet.position;
      const toProcessPos = toProcess.position;

      toProcess.applyGravity([planetPos.x, planetPos.y, planetPos.z]);
      planet.applyGravity([toProcessPos.x, toProcessPos.y, toProcessPos.z]);
    });
  }

  planets.forEach((planet) => {
    planet.move();
  });
}

const allX = [];
const allY = [];
const allZ = [];

for (let i = 0; i < 300000; i++) {
  advanceTime(planets);

  const xs: number[] = [];
  const ys: number[] = [];
  const zs: number[] = [];

  planets.forEach((planet) => {
    xs.push(planet.position.x);
    ys.push(planet.position.y);
    zs.push(planet.position.z);
    xs.push(planet.velocity.x);
    ys.push(planet.velocity.y);
    zs.push(planet.velocity.z);
  });

  allX.push(xs.join(','));
  allY.push(ys.join(','));
  allZ.push(zs.join(','));
}

function findReoccurence(positions: string[]) {
  const set = new Set();

  let foundElement = '';
  let foundIdx = 0;

  for (let i = 0; i < positions.length; i++) {
    const element = positions[i];

    if (set.has(element)) {
      // console.log('pos', positions.indexOf(element));
      foundElement = element;
      foundIdx = i;
      break;
    } else {
      set.add(element);
    }
  }

  console.log('foundIdx', foundIdx);
  // console.log('indexof', positions.indexOf(foundElement, 0));

  // console.log(foundIdx - positions.indexOf(foundElement));
  return foundIdx - positions.indexOf(foundElement);
}

const valX = findReoccurence(allX);
const valY = findReoccurence(allY);
const valZ = findReoccurence(allZ);

function findLCM(numbers: number[]) {
  const gcd = (a: number, b: number): number => {
    if (!b) return b === 0 ? a : NaN;
    return gcd(b, a % b);
  };
  const lcm = (a: number, b: number): number => {
    return (a * b) / gcd(a, b);
  };

  let n = 1;
  for (let i = 0; i < numbers.length; ++i) {
    n = lcm(numbers[i], n);
  }
  return n;
}

console.log(findLCM([valX, valY, valZ]));
