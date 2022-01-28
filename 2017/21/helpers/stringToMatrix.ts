const stringToMatrix = (str: string) => {
  return str.split('/').map((el) => {
    return el.split('');
  });
};

export default stringToMatrix;
