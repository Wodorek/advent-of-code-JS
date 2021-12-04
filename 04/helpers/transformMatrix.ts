const transformMatrix = (arr: any[][]): any[][] => {
  return arr[0].map((_: any, index: number) =>
    arr.map((row) => row[index]).reverse()
  );
};

export default transformMatrix;
