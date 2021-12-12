/**
 *
 * @param str input string
 * @returns and object containing each cave with array of its connections
 */
const prepareInput = (str: string) => {
  const edges: Record<string, string[]> = {};
  str
    .trim()
    .split(/\n+/)
    .map((el) => {
      return el.trim().split(/\s+/);
    })
    .map((line) => {
      const [a, b] = line[0].split('-');
      edges[a] = edges[a] ?? [];
      edges[b] = edges[b] ?? [];
      edges[a].push(b);
      edges[b].push(a);
    });
  return edges;
};

export default prepareInput;
