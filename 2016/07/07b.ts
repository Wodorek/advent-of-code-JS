import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

//regex free solution!

let supportingCount = 0;

const checkSSLsupport = (ip: string) => {
  let left = 0;
  let right = 2;

  const splitIp = ip.split('');

  const BABs = [];

  while (left < ip.length) {
    if (
      splitIp[left] === splitIp[right] &&
      splitIp[left] !== splitIp[left + 1]
    ) {
      let checker = left;

      while (checker < ip.length) {
        if (ip[checker] === ']') {
          break;
        }

        if (ip[checker] === '[') {
          BABs.push(ip.slice(left, right + 1));
          break;
        }

        if (checker === ip.length - 1) {
          BABs.push(ip.slice(left, right + 1));
        }
        checker++;
      }
    }

    left++;
    right++;
  }

  let supportsSSL = false;
  BABs.forEach((BAB) => {
    const lookFor = `${BAB[1]}${BAB[0]}${BAB[1]}`;

    let lookup = 0;

    while (lookup < ip.length) {
      if (lookFor === ip.slice(lookup, lookup + 3)) {
        let checker = lookup;

        while (checker < ip.length) {
          if (ip[checker] === '[') {
            break;
          }

          if (ip[checker] === ']') {
            supportsSSL = true;
          }

          checker++;
        }
      }
      lookup++;
    }
  });
  return supportsSSL;
};

let SSLsupportCount = 0;

inputArr.forEach((ip) => {
  if (checkSSLsupport(ip)) {
    SSLsupportCount++;
  }
});

console.log(SSLsupportCount);
