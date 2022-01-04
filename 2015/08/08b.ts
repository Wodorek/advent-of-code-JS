import fs from 'fs';

//This seems hacky, but what really doesn't in JS?
//Also, for this to work, we need to read from the file, because of the quotes

const inputArr = fs
  .readFileSync('./input.txt', 'utf-8')
  .trim()
  .split('\n')
  .map((el) => {
    return el.trim();
  });

const calculateChars = (line: string) => {
  const inChars = line.length;
  const inMemory = 2 + line.replace(/\\/g, '\\\\').replace(/"/g, '\\"').length;

  return inMemory - inChars;
};

let accumulator = 0;

inputArr.forEach((line) => {
  accumulator += calculateChars(line);
});

console.log(accumulator);
