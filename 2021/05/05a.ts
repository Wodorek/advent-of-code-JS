import input from './input';
import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const lookup: any = {};

for (let i = 0; i < inputArr.length; i++) {
  const el = inputArr[i];

  if (el[0][0] === el[1][0]) {
    let startingPoint = +el[0][1];
    const endPoint = +el[1][1];
    const direction = +el[1][1] > +el[0][1] ? 1 : -1;

    const iterations = Math.abs(startingPoint - endPoint) + 1;
    let i = 0;

    do {
      if (lookup[`${el[0][0]},${startingPoint}`]) {
        lookup[`${el[0][0]},${startingPoint}`] += 1;
      } else {
        lookup[`${el[0][0]},${startingPoint}`] = 1;
      }
      startingPoint += 1 * direction;
      i++;
    } while (i < iterations);
  }

  if (el[0][1] === el[1][1]) {
    let startingPoint = +el[0][0];
    const endPoint = +el[1][0];
    const direction = +el[1][0] > +el[0][0] ? 1 : -1;

    const iterations = Math.abs(startingPoint - endPoint) + 1;
    let i = 0;

    do {
      if (lookup[`${startingPoint},${el[0][1]}`]) {
        lookup[`${startingPoint},${el[0][1]}`] += 1;
      } else {
        lookup[`${startingPoint},${el[0][1]}`] = 1;
      }
      startingPoint += 1 * direction;
      i++;
    } while (i < iterations);
  }
}

let hotSpots = 0;

Object.keys(lookup).forEach((key) => {
  if (lookup[key] > 1) {
    hotSpots++;
  }
});
console.log(hotSpots);
