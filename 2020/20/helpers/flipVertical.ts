function flipVertical(matrix: number[][]) {
  return matrix.map((line) => {
    return line.reverse();
  });
}

export default flipVertical;
