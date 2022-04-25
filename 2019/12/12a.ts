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

for (let i = 0; i < 1000; i++) {
  advanceTime(planets);
}

function calcSystemEnergy(planets: Planet[]) {
  let totalEnergy = 0;

  planets.forEach((planet) => {
    totalEnergy += planet.getEnergy;
  });

  return totalEnergy;
}

console.log(calcSystemEnergy(planets));
