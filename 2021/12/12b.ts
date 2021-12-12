import checkVisited from './helpers/checkVisited';
import isSmall from './helpers/isSmall';
import prepareInput from './helpers/prepapreInput';
import input from './input';

const inputArr = prepareInput(input);

console.log(inputArr);

const countPaths = (
  edges: Record<string, string[]>,
  allowRevisit = false,
  curr = 'start',
  path: string[] = []
): number => {
  if (curr === 'end') return 1;

  if (isSmall(curr) && checkVisited(curr, path)) {
    allowRevisit = false;
  }

  return edges[curr]
    .filter(
      (neighbor) =>
        !isSmall(neighbor) ||
        !checkVisited(neighbor, path) ||
        (allowRevisit && neighbor !== 'start')
    )
    .map((neighbor) =>
      countPaths(edges, allowRevisit, neighbor, [...path, curr])
    )
    .reduce((acc, count) => acc + count, 0);
};

console.log(countPaths(inputArr, true));
