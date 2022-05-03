import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

// console.log(inputArr);

function mapArr(input: string) {
  return input.split('\n').map((el) => {
    const split = el.split(',');
    return split.map(Number);
  });
}

const arr1 = mapArr(`-618,-824,-621
-537,-823,-458
-447,-329,318
404,-588,-901
544,-627,-890
528,-643,409
-661,-816,-575
390,-675,-793
423,-701,434
-345,-311,381
459,-707,401
-485,-357,347`);

const arr2 = mapArr(`686,422,578
605,423,415
515,917,-361
-336,658,858
-476,619,847
-460,603,-452
729,430,532
-322,571,750
-355,545,-477
413,935,-424
-391,539,-444
553,889,-390`);

const calcs: number[][] = [];

for (let i = 0; i < arr1.length; i++) {
  const el1 = arr1[i];
  const el2 = [-1 * arr2[i][2], arr2[i][1], arr2[i][0]];

  calcs.push([el1[0] - el2[0], el1[1] - el2[1], el1[2] - el2[2]]);
}

console.log(calcs);
