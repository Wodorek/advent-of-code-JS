import input from './input';

import prepareInput from './helpers/prepareInput';

//[[x,y],size,used,avail,use%]
const inputArr = prepareInput(input);

const elems: string[][] = [];

elems.length = 27;

for (let i = 0; i < inputArr.length; i++) {
  const element = inputArr[i];

  const idx = element[0][1];

  if (elems[idx]) {
    elems[idx].push(`${element[2]},${element[3]}`);
  } else {
    elems[idx] = [`${element[2]},${element[3]}`];
  }
}

elems.forEach((el) => {
  console.log(el.join(' '));
});

// this is solvable by hand. Print the "maze", look for an empty node, this is
// our empty tile in a sliding puzzle. Move the window to the top left, beware of the triple digits wall, you can't pass those, look for an opening counting spaces. next move the hole next to the top right corner, our target data (max -1 in equation), swap the data with the hole, and swap the hole back, so it is 1 position before the data, on the x axis, this takes 5 moves

const emptyNodeX = 3;
const emptyNodeY = 20;
const maxX = 34;

console.log(emptyNodeX + emptyNodeY + maxX + (maxX - 1) * 5);
