function flipVertical(matrix: string[][]) {
  return matrix.map((line) => {
    return line.reverse();
  });
}

export default flipVertical;
