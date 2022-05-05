import input from './input';

import prepareInput from './helpers/prepareInput';
import { isNear } from './helpers/isNear';

const inputArr = prepareInput(input);

type Point = [x: number, y: number, z: number];

const Orientations: Array<(p: Point) => Point> = [
  ([x, y, z]) => [x, y, z],
  ([x, y, z]) => [x, -y, -z],
  ([x, y, z]) => [x, z, -y],
  ([x, y, z]) => [x, -z, y],
  ([x, y, z]) => [-x, -y, z],
  ([x, y, z]) => [-x, y, -z],
  ([x, y, z]) => [-x, z, y],
  ([x, y, z]) => [-x, -z, -y],
  ([x, y, z]) => [y, z, x],
  ([x, y, z]) => [y, -z, -x],
  ([x, y, z]) => [y, x, -z],
  ([x, y, z]) => [y, -x, z],
  ([x, y, z]) => [-y, -z, x],
  ([x, y, z]) => [-y, z, -x],
  ([x, y, z]) => [-y, -x, -z],
  ([x, y, z]) => [-y, x, z],
  ([x, y, z]) => [z, x, y],
  ([x, y, z]) => [z, -x, -y],
  ([x, y, z]) => [z, y, -x],
  ([x, y, z]) => [z, -y, x],
  ([x, y, z]) => [-z, -x, y],
  ([x, y, z]) => [-z, x, -y],
  ([x, y, z]) => [-z, y, x],
  ([x, y, z]) => [-z, -y, -x],
];

class Scanner {
  orientation: number = 0;
  offset: Point = [0, 0, 0];
  placed: boolean = false;
  id: number;
  beacons: Point[];
  beaconsSet = new Set<string>();

  constructor(id: number, beacons: Point[]) {
    this.id = id;
    this.beacons = beacons;
  }

  getBeacons(): Point[] {
    if (this.placed) {
      return this.beacons;
    }

    const result = [];

    //transform points to the proper orientation
    for (const b of this.beacons) {
      result.push(Orientations[this.orientation](b));
    }

    // add offset to points
    for (const b of result) {
      b[0] += this.offset[0];
      b[1] += this.offset[1];
      b[2] += this.offset[2];
    }

    result.sort((p1, p2) => {
      if (p1[0] !== p2[0]) {
        return p1[0] - p2[0];
      }
      if (p1[1] !== p2[1]) {
        return p1[1] - p2[1];
      }

      return p1[2] - p2[2];
    });

    return result;
  }

  fixate() {
    if (this.placed) throw new Error('placed already');
    const beacons = this.getBeacons();
    this.placed = true;
    this.beacons = beacons;
    for (const [x, y, z] of beacons) {
      this.beaconsSet.add(`${x} ${y} ${z}`);
    }
  }

  get getBeaconsSet() {
    return this.beaconsSet;
  }

  get getPosition() {
    return this.offset.map((t) => t) as Point;
  }

  overlaps(targetScanner: Scanner) {
    const targetBeacons = targetScanner.getBeacons();
    const targetSet = targetScanner.getBeaconsSet;

    for (let orient = 0; orient < 24; ++orient) {
      this.orientation = orient;

      const thisBeacons = this.getBeacons();

      for (let i = 0; i <= targetBeacons.length - 12; ++i) {
        for (let j = 0; j <= thisBeacons.length - 12; ++j) {
          const offset: Point = [0, 0, 0];

          offset[0] = targetBeacons[j][0] - thisBeacons[i][0];
          offset[1] = targetBeacons[j][1] - thisBeacons[i][1];
          offset[2] = targetBeacons[j][2] - thisBeacons[i][2];

          const adjustedBeacons = thisBeacons.map((t) => [
            t[0] + offset[0],
            t[1] + offset[1],
            t[2] + offset[2],
          ]);

          const shared = new Set<string>();
          for (const [x, y, z] of adjustedBeacons) {
            const key = `${x} ${y} ${z}`;
            if (targetSet.has(key)) {
              shared.add(key);
            }
          }
          if (shared.size < 12) continue;
          let tooClose = false;
          for (const [x, y, z] of adjustedBeacons) {
            const key = `${x} ${y} ${z}`;
            if (shared.has(key)) continue;
            if (isNear([x, y, z], targetScanner.getPosition)) tooClose = true;
          }
          if (tooClose) continue;
          for (const [x, y, z] of targetBeacons) {
            const key = `${x} ${y} ${z}`;
            if (shared.has(key)) continue;
            if (isNear([x, y, z], offset)) tooClose = true;
          }
          if (tooClose) continue;
          this.offset = offset;
          this.fixate();
          return true;
        }
      }
    }
    return false;
  }
}

const scanners: Scanner[] = [];

inputArr.forEach((inp, idx) => {
  scanners.push(new Scanner(idx, inp));
});

scanners[0].fixate();
const done = [scanners[0].id];
while (true) {
  let found = false;
  for (const source of scanners) {
    if (!source.placed) continue;
    for (const s of scanners) {
      if (s.placed) continue;
      if (s.overlaps(source)) {
        found = true;
        done.push(s.id);
        break;
      }
    }
  }
  if (!found) {
    break;
  }
}
if (scanners.length != done.length) {
  console.log(scanners.length, done.length);
  throw new Error('not all scanners are placed');
}

const beacons = new Set<string>();
for (const s of scanners) {
  for (const [x, y, z] of s.getBeacons()) {
    const key = `${x} ${y} ${z}`;
    beacons.add(key);
  }
}

console.log(beacons.size);
