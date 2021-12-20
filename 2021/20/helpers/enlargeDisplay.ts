const enlargeDisplay = (arr: string[][], cycle: number) => {
  const filler = cycle % 2 === 0 ? '#' : '.';

  const expandedHorizontal = arr.map((el) => {
    return [filler, ...el, filler];
  });

  const final = [];

  const emptyPixelLine: string[] = [];
  emptyPixelLine.length = expandedHorizontal[0].length;
  emptyPixelLine.fill(filler);

  final.push(emptyPixelLine, ...expandedHorizontal, emptyPixelLine);

  return final as string[][];
};
export default enlargeDisplay;
