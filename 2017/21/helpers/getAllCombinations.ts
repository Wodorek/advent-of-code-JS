import flipMatrix from './flipMatrix';
import rotateMatrix from './rotateMatrix';

const getAllCombinations = (matrix: string[][]) => {
  const rotated = [matrix, flipMatrix(matrix)];

  let currentMatrix = matrix;

  for (let i = 0; i < 3; i++) {
    currentMatrix = rotateMatrix(currentMatrix);
    rotated.push(currentMatrix);
    rotated.push(flipMatrix(currentMatrix));
  }

  return rotated;
};

export default getAllCombinations;
