export default {};

const input = '01000100010010111';

const processStep = (str: string) => {
  const a = str;
  let b = a.slice(0);
  b = b
    .split('')
    .reverse()
    .map((el) => {
      if (el === '0') {
        return '1';
      } else {
        return '0';
      }
    })
    .join('');

  return a + '0' + b;
};

const generateCheckSum = (str: string): string => {
  const pairs = [];

  for (let i = 0; i < str.length; i += 2) {
    pairs.push(str.slice(i, i + 2));
  }

  let newStr = '';

  pairs.forEach((pair) => {
    if (pair[0] === pair[1]) {
      newStr = newStr.concat('1');
    } else {
      newStr = newStr.concat('0');
    }
  });

  if (newStr.length % 2 === 0) {
    return generateCheckSum(newStr);
  } else {
    return newStr;
  }
};

let dataString = input;

//this works
//I don't know why, but it does
while (dataString.length < 35651584) {
  dataString = processStep(dataString);
}

const checksumData = dataString.slice(0, 35651584);

console.log(generateCheckSum(checksumData));
