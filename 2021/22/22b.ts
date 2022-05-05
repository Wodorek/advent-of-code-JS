import { Cube } from './types';

import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

function common(minA = 0, maxA = 0, minB = 0, maxB = 0) {
  const min = Math.max(minA, minB);
  const max = Math.min(maxA, maxB);

  if (min <= max) return [min, max];

  return false;
}

const exclude = (cubeA: Cube, cubeInner: Cube) => {
  const cubes: Cube[] = [];
  const [xMinA, xMaxA] = cubeA.x;
  const [yMinA, yMaxA] = cubeA.y;
  const [zMinA, zMaxA] = cubeA.z;
  let [xMinInner, xMaxInner] = cubeInner.x;
  let [yMinInner, yMaxInner] = cubeInner.y;
  let [zMinInner, zMaxInner] = cubeInner.z;

  // Upper cube (x and y limited to inner)
  if (zMaxA > zMaxInner)
    cubes.push({
      x: [xMinInner, xMaxInner],
      y: [yMinInner, yMaxInner],
      z: [zMaxInner + 1, zMaxA],
    });

  // Lower cube (x and y limited to inner)
  if (zMinA < zMinInner)
    cubes.push({
      x: [xMinInner, xMaxInner],
      y: [yMinInner, yMaxInner],
      z: [zMinA, zMinInner - 1],
    });

  // Forward cube (x limited to inner)
  if (yMaxA > yMaxInner)
    cubes.push({
      x: [xMinInner, xMaxInner],
      y: [yMaxInner + 1, yMaxA],
      z: [zMinA, zMaxA],
    });

  // Backward cube (x limited to inner)
  if (yMinA < yMinInner)
    cubes.push({
      x: [xMinInner, xMaxInner],
      y: [yMinA, yMinInner - 1],
      z: [zMinA, zMaxA],
    });

  // Left cube (no limits)
  if (xMinA < xMinInner)
    cubes.push({
      x: [xMinA, xMinInner - 1],
      y: [yMinA, yMaxA],
      z: [zMinA, zMaxA],
    });

  // Right cube (no limits)
  if (xMaxA > xMaxInner)
    cubes.push({
      x: [xMaxInner + 1, xMaxA],
      y: [yMinA, yMaxA],
      z: [zMinA, zMaxA],
    });

  return cubes;
};

const intersect = (cubeA: Cube, cubeB: Cube) => {
  const [xMinA, xMaxA] = cubeA.x;
  const [yMinA, yMaxA] = cubeA.y;
  const [zMinA, zMaxA] = cubeA.z;
  const [xMinB, xMaxB] = cubeB.x;
  const [yMinB, yMaxB] = cubeB.y;
  const [zMinB, zMaxB] = cubeB.z;
  const commonX = common(xMinA, xMaxA, xMinB, xMaxB);
  const commonY = common(yMinA, yMaxA, yMinB, yMaxB);
  const commonZ = common(zMinA, zMaxA, zMinB, zMaxB);

  if (!commonX || !commonY || !commonZ) return false;

  const commonCube = {
    x: commonX,
    y: commonY,
    z: commonZ,
  };
  const uniqueCubes = exclude(cubeA, commonCube);

  return [commonCube, uniqueCubes];
};

const mapIntersect = (cubeA: Cube, cubeB: Cube) => {
  const intersectResult = intersect(cubeA, cubeB);

  if (intersectResult) return intersectResult[1];

  return cubeA;
};

const calcCubeSum = (cube: Cube) => {
  const [xMin, xMax] = cube.x;
  const [yMin, yMax] = cube.y;
  const [zMin, zMax] = cube.z;

  return (xMax - xMin + 1) * (yMax - yMin + 1) * (zMax - zMin + 1);
};

const sumAllCubes = (cubes: Cube[]) =>
  cubes.reduce((sum, cube) => sum + calcCubeSum(cube), 0);

let addedCubes: Cube[] = [];

inputArr.forEach((action) => {
  if (action[0] === 1) {
    let cubesToAdd = [{ x: action[1].x, y: action[1].y, z: action[1].z }];

    addedCubes.forEach(
      (cubeB) =>
        (cubesToAdd = cubesToAdd
          .map((cubeA) => mapIntersect(cubeA, cubeB))
          .flat())
    );
    cubesToAdd.forEach((cube) => addedCubes.push(cube));
  } else
    addedCubes = addedCubes
      .map((cubeA) =>
        mapIntersect(cubeA, { x: action[1].x, y: action[1].y, z: action[1].z })
      )
      .flat();
});

console.log(sumAllCubes(addedCubes));
