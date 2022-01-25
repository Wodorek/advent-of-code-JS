import knotHash from './helpers/knotHash';

const toBinary = (str: string) => {
  let output = '';

  str.split('').forEach((el) => {
    output = output.concat(parseInt(el, 16).toString(2));
  });

  return output;
};

let taken = 0;

for (let i = 0; i < 128; i++) {
  const hashed = knotHash(`amgozmfv-${i}`);

  const binary = toBinary(hashed);

  binary.split('').forEach((el) => {
    if (el === '1') {
      taken++;
    }
  });
}

console.log(taken);
