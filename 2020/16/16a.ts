import input from './input';

import prepareInput from './helpers/prepareInput';

const [fields, myTicket, nearbyTickets] = prepareInput(input);

const possibleFields = new Set<number>();

fields.forEach((field) => {
  for (let i = field[1][0]; i < field[1][1] + 1; i++) {
    possibleFields.add(i);
  }

  for (let i = field[2][0]; i < field[2][1] + 1; i++) {
    possibleFields.add(i);
  }
});

console.log(nearbyTickets);

let errorRate = 0;

nearbyTickets.forEach((ticket) => {
  ticket.forEach((num) => {
    if (!possibleFields.has(num)) {
      errorRate += num;
    }
  });
});

console.log(errorRate);
