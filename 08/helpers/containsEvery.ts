const containsEvery = (arr1: any[], arr2: any[]) => {
  return arr1.every((e) => arr2.includes(e));
};

export default containsEvery;
