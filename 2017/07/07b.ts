import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const weightsLookup: { [key: string]: number } = {};
const nodeStructure: { [key: string]: string[] } = {};

//from p1 root = ykpsek

inputArr.forEach((program) => {
  weightsLookup[program[0][0]] = +program[0][1];
  nodeStructure[program[0][0]] = program[1] || [];
});

//wrucr

//kcxol

const getWeights = (root: string) => {
  const holds = nodeStructure[root];

  if (holds.length === 0) {
    return weightsLookup[root];
  } else {
    let sum = weightsLookup[root];
    holds.forEach((program) => {
      sum += getWeights(program);
    });

    return sum;
  }
};

let pastOverweight = 0;
let pastCorrect = 0;
let currNode = 'ykpsek';

while (true) {
  const nodes = nodeStructure[currNode];
  const weights = nodes.map((node) => {
    return getWeights(node);
  });

  const weightsMap: { [key: string]: number } = {};

  weights.forEach((weight) => {
    if (weightsMap[weight]) {
      weightsMap[weight]++;
    } else {
      weightsMap[weight] = 1;
    }
  });

  if (Object.keys(weightsMap).length === 1) {
    console.log(
      'solution:',
      pastCorrect - pastOverweight + weightsLookup[currNode]
    );
    break;
  }

  const overweightBranch = +Object.keys(weightsMap).find((el) => {
    return weightsMap[el] === 1;
  })!;

  pastCorrect = +Object.keys(weightsMap).find((el) => {
    return weightsMap[el] > 1;
  })!;

  currNode = nodes[weights.indexOf(overweightBranch)];
  pastOverweight = overweightBranch;
}
