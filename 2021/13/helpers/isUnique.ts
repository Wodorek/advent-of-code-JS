const isUnique = (value: string, index: number, self: string) => {
  return self.indexOf(value) === index;
};

export default isUnique;
