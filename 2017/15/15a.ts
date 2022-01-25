let a = 289;
let b = 629;

const factorA = 16807;
const factorB = 48271;

const divider = 2147483647;

let matches = 0;

for (let i = 0; i < 40000000; i++) {
  let newA = (a * factorA) % divider;
  let newB = (b * factorB) % divider;

  if (
    newA.toString(2).padStart(32, '0').slice(16) ===
    newB.toString(2).padStart(32, '0').slice(16)
  ) {
    matches++;
  }

  a = newA;
  b = newB;
}

console.log(matches);
