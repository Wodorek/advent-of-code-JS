const checkVisited = (cave: string, path: string[]) => {
  return path.find((node) => node === cave);
};

export default checkVisited;
