function flipVertical<T>(matrix: T[][]) {
  return matrix.map((line) => {
    return line.reverse();
  });
}

export default flipVertical;
