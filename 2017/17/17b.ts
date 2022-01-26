export default {};
const input = 382;

let buffer = 1;
let position = 0;

let afterZero = 0;

for (let i = 1; i < 50000000; i++) {
  position = position + input;

  while (position > buffer - 1) {
    position -= buffer;
  }

  buffer++;

  if (position === 0) {
    afterZero = i;
  }

  position++;
}

console.log(afterZero);
