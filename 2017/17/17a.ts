export default {};

const input = 382;

const buffer = [0];
let position = 0;

for (let i = 1; i < 2018; i++) {
  position = position + input;

  while (position > buffer.length - 1) {
    position -= buffer.length;
  }

  buffer.splice(position + 1, 0, i);
  position++;
}

console.log(buffer[buffer.indexOf(2017) + 1]);
