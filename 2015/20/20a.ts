const input = 33100000 / 10;

const houses: number[] = [];
houses.length = input;
houses.fill(0);

let houseNumber = input;

for (let i = 1; i < input; i++) {
  for (let j = i; j < input; j += i) {
    if ((houses[j] += i) >= input && j < houseNumber) houseNumber = j;
  }
}

console.log(houseNumber);
