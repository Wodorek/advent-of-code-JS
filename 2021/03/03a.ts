import input from './input';

const inputArr = input.split('\n');

const newArr: number[][] = [];

for (let i = 0; i < inputArr.length; i++) {
  const elem = inputArr[i].split('').map(Number);

  elem.forEach((num, idx) => {
    if (!newArr[idx]) {
      newArr.push([]);
    }
    newArr[idx].push(num);
  });
}

const gammaArr = [];

for (let i = 0; i < newArr.length; i++) {
  const elem = newArr[i];

  const reduced = elem.reduce((prev, curr) => {
    return prev + curr;
  });

  const mostCommon = reduced > elem.length / 2 - 1 ? 1 : 0;

  gammaArr.push(mostCommon);
}

const epsilonArr = gammaArr.map((el) => {
  if (el === 0) {
    return 1;
  } else {
    return 0;
  }
});

console.log(parseInt(gammaArr.join(''), 2) * parseInt(epsilonArr.join(''), 2));
