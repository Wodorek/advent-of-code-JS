import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

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

const workers: { [key: string]: { doneIn: number; processing: string } } = {};

for (let i = 0; i < 5; i++) {
  workers[i] = { doneIn: 0, processing: '' };
}

const workerKeys = Object.keys(workers);

let timeElapsed = 0;

while (order.length < len) {
  workerKeys.forEach((key) => {
    if (workers[key].doneIn > 0) {
      workers[key].doneIn--;
    }

    if (workers[key].doneIn === 0 && workers[key].processing !== '') {
      processedNodes.push(workers[key].processing);
      order = order.concat(workers[key].processing);
      workers[key].processing = '';
    }
  });

  Object.keys(mapping).forEach((key) => {
    mapping[key] = mapping[key].filter((el) => {
      return !processedNodes.includes(el);
    });

    if (mapping[key].length === 0) {
      possibleNodes.push(key);
      delete mapping[key];
    }
  });

  possibleNodes.sort();

  const freeWorkers = Object.keys(workers).filter((el) => {
    return workers[el].processing === '';
  });

  while (freeWorkers.length > 0 && possibleNodes.length > 0) {
    const worker = freeWorkers.pop()!;
    const node = possibleNodes.shift()!;

    workers[worker].processing = node;
    workers[worker].doneIn = node.charCodeAt(0) - 4;
  }

  timeElapsed++;
}

console.log(order, timeElapsed - 1);
