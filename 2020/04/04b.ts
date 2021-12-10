import prepareInput from './helpers/prepareInput';
import input from './input';

const inputArr = prepareInput(input);

let validPassports = 0;

for (let i = 0; i < inputArr.length; i++) {
  const el: { [key: string]: string } = inputArr[i];

  const fields = Object.keys(el);

  if (fields.length === 8 || (fields.length === 7 && !fields.includes('cid'))) {
    let valid = true;
    fields.forEach((field) => {
      const val = el[field];

      if (field === 'byr') {
        if (+val > 2002 || +val < 1920) {
          valid = false;
        }
      }

      if (field === 'iyr') {
        if (+val > 2020 || +val < 2010) {
          valid = false;
        }
      }

      if (field === 'eyr') {
        if (+val > 2030 || +val < 2020) {
          valid = false;
        }
      }

      if (field === 'hgt') {
        const type = val.slice(val.length - 2, val.length);

        if (!['cm', 'in'].includes(type)) {
          valid = false;
        }

        if (type === 'cm') {
          const h = val.slice(0, 3);
          if (+h > 193 || +h < 150) {
            valid = false;
          }
        }

        if (type === 'in') {
          const h = val.slice(0, 2);
          if (+h > 76 || +h < 59) {
            valid = false;
          }
        }
      }

      if (field === 'hcl') {
        if (!val.match(/(#[a-f0-9]{5})\w/g)) {
          valid = false;
        }
      }

      if (field === 'ecl') {
        if (!['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(val)) {
          valid = false;
        }
      }

      if (field === 'pid') {
        if (val.length !== 9) {
          valid = false;
        }
      }
    });
    if (valid) {
      console.log(fields.length);
      validPassports++;
    }
  }
}

console.log(validPassports);
