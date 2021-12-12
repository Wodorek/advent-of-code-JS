import checkVisited from './helpers/checkVisited';
import isSmall from './helpers/isSmall';
import prepareInput from './helpers/prepapreInput';
import input from './input';

const inputArr = prepareInput(input);

const countPaths = (
  edges: Record<string, string[]>,
  curr = 'start',
  path: string[] = []
): number => {
  if (curr === 'end') return 1;

  return edges[curr]
    .filter((neighbor) => !isSmall(neighbor) || !checkVisited(neighbor, path))
    .map((neighbor) => countPaths(edges, neighbor, [...path, curr]))
    .reduce((acc, count) => acc + count, 0);
};

console.log(countPaths(inputArr));
