import input from './input.json';

const queue = [input];

let accumulator = 0;

const processObj = (obj: { [key: string]: any }) => {
  const keys = Object.keys(obj);
  console.log(keys);

  keys.forEach((key) => {
    if (typeof obj[key] === 'object') {
      queue.push(obj[key]);
    }

    if (typeof obj[key] === 'number') {
      accumulator += obj[key];
    }
  });
};

const processArr = (arr: any[]) => {
  arr.forEach((el) => {
    if (typeof el === 'object') {
      queue.push(el);
    }

    if (typeof el === 'number') {
      accumulator += el;
    }
  });
};

const processEntity = (entity: any) => {
  if (entity instanceof Array) {
    processArr(entity);
  } else {
    processObj(entity);
  }
};

while (queue.length > 0) {
  const entity = queue.pop()!;
  processEntity(entity);
}

console.log(accumulator);
