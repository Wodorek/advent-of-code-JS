import input from './input';

import prepareInput from './helpers/prepareInput';

let [fields, myTicket, nearbyTickets] = prepareInput(input);

const possibleFields = new Set<number>();

fields.forEach((field) => {
  for (let i = field[1][0]; i < field[1][1] + 1; i++) {
    possibleFields.add(i);
  }

  for (let i = field[2][0]; i < field[2][1] + 1; i++) {
    possibleFields.add(i);
  }
});

nearbyTickets = nearbyTickets.filter((ticket) => {
  return ticket.every((val) => {
    return possibleFields.has(val);
  });
});

const fieldsCantBe: { [key: string]: number[] } = {};

fields.forEach((field) => {
  fieldsCantBe[field[0]] = [];
});

nearbyTickets.forEach((ticket) => {
  ticket.forEach((num, idx) => {
    fields.forEach((field) => {
      if (
        (num >= field[1][0] && num <= field[1][1]) ||
        (num >= field[2][0] && num <= field[2][1])
      ) {
      } else {
        fieldsCantBe[field[0]].push(idx);
      }
    });
  });
});

const solvedFields: { [key: string]: number } = {};

//field that can't be all but one possible fields is the one we are looking for
let maxLen = fields.length - 1;

while (Object.keys(solvedFields).length < fields.length) {
  Object.keys(fieldsCantBe).forEach((key) => {
    if (fieldsCantBe[key].length === maxLen) {
      for (let i = 0; i < fields.length; i++) {
        if (
          !fieldsCantBe[key].includes(i) &&
          !Object.values(solvedFields).includes(i)
        ) {
          solvedFields[key] = i;
        }
      }
    }
  });
  maxLen--;
}

let result = 1;

console.log(solvedFields);

Object.keys(solvedFields).forEach((key) => {
  if (key.includes('departure')) {
    result *= myTicket[solvedFields[key]];
  }
});

console.log(result);
