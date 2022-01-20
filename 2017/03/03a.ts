const input = 277678;

const edgeLength = Math.ceil(Math.sqrt(input));
const middle = Math.ceil((edgeLength - 1) / 2);

console.log(Math.max(0, middle - 1 + Math.abs(middle - (input % edgeLength))));
