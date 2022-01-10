import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

//regex free solution!

const checkTSLsupport = (ip: string) => {
  let left = 0;
  let leftEnd = 1;
  let right = 2;
  let rightEnd = 3;

  let canSupport = false;

  while (left < ip.length) {
    if (ip[left] !== ip[leftEnd]) {
      const leftPart = `${ip[left]}${ip[leftEnd]}`;
      const rightPart = `${ip[rightEnd]}${ip[right]}`;

      if (leftPart === rightPart) {
        let checker = left - 1;

        while (checker >= 0) {
          const item = ip[checker];

          if (item === ']') {
            break;
          }

          if (item === '[') {
            return false;
          }
          checker--;
        }
        canSupport = true;
      }
    }
    left++;
    leftEnd++;
    right++;
    rightEnd++;
  }

  return canSupport;
};

let supportingCount = 0;

inputArr.forEach((ip) => {
  if (checkTSLsupport(ip)) {
    supportingCount++;
  }
});

console.log(supportingCount);
