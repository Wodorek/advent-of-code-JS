import draw from './draw';
import isUnique from './helpers/isUnique';
import prepareInput from './helpers/prepareInput';
import input from './input';

let [dots, instructions] = prepareInput(input);

const fold = (paper: number[][], instruction: string[]) => {
  //modify x or y coord
  const foldLine = instruction[0] === 'x' ? 0 : 1;
  const foldIdx = +instruction[1];

  paper.forEach((dot, idx) => {
    if (dot[foldLine] < foldIdx) {
      return;
    }

    paper[idx][foldLine] = dot[foldLine] - 2 * (dot[foldLine] - foldIdx);
  });

  let mapped = paper.map((el) => {
    return el.join(',');
  });

  let unique = [...new Set(mapped)];

  dots = unique.map((el) => {
    const coords = el.split(',');
    return [+coords[0], +coords[1]];
  });
};

instructions.forEach((instruction) => {
  fold(dots, instruction);
});

draw(dots);
