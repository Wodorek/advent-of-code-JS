function chunkArray(arr: number[], size: number) {
  const chunks: number[][] = [];

  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }

  return chunks;
}

export default chunkArray;
