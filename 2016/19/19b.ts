export default {};

//thanks for the pattern finding, Numberphile
const input = 3018458;

let num = 1;

while (num * 3 < input) {
  num = num * 3;
}

console.log(input - num);
