import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

console.log(inputArr);

const mapping: { [key: string]: string[] } = {};

inputArr.forEach((el) => {
  if (!mapping[el[0]]) {
    mapping[el[0]] = [];
  }

  if (!mapping[el[1]]) {
    mapping[el[1]] = [];
  }

  mapping[el[1]].push(el[0]);
});

let order = '';
const len = Object.keys(mapping).length;

let possibleNodes: string[] = [];
const processedNodes: string[] = [];

Object.keys(mapping).forEach((key) => {
  if (mapping[key].length === 0) {
    possibleNodes.push(key);
    delete mapping[key];
  }
});

possibleNodes.sort();

while (order.length < len) {
  const currentNode = possibleNodes.shift()!;
  order = order.concat(currentNode);
  const keys = Object.keys(mapping);
  processedNodes.push(currentNode);

  keys.forEach((key) => {
    mapping[key] = mapping[key].filter((el) => {
      return !processedNodes.includes(el);
    });
    if (mapping[key].length === 0) {
      possibleNodes.push(key);
      delete mapping[key];
    }
  });

  possibleNodes.sort();
}

console.log(order);
