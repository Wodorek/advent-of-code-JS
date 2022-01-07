const input = 33100000 / 10;

const houses: number[] = [];
houses.length = input;
houses.fill(0);

let houseNumber = input;

for (let i = 1; i < input; i++) {
  let visits = 0;
  for (let j = i; j < input; j += i) {
    if (
      (houses[j] = (houses[j] || 11) + i * 11) >= input * 10 &&
      j < houseNumber
    )
      houseNumber = j;

    visits++;

    if (visits === 50) {
      break;
    }
  }
}

console.log(houseNumber);

//typescript complains otherwise
export {};
