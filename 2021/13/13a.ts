import prepareInput from './helpers/prepareInput';
import input from './input';

const [dots, instructions] = prepareInput(input);

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

  console.log(unique.length);
};

fold(dots, instructions[0]);
