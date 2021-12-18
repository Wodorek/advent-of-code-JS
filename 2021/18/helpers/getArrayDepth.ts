const getArrayDepth = (value: any): number => {
  return Array.isArray(value) ? 1 + Math.max(...value.map(getArrayDepth)) : 0;
};

export default getArrayDepth;
