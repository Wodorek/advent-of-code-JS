import countLit from './helpers/countLit';
import enlargeDisplay from './helpers/enlargeDisplay';
import getPixelValue from './helpers/getPixelValue';
import prepareInput from './helpers/prepareInput';
import input from './input';

let [lookupStr, imageArr] = prepareInput(input);

const enchanceImage = (arr: string[][], cycle: number) => {
  const newImage = [];

  const inflated = enlargeDisplay(arr, cycle);

  for (let row = 0; row < inflated.length; row++) {
    let newRow = [];

    const currRow = inflated[row];

    for (let colum = 0; colum < currRow.length; colum++) {
      const pixelIdx = getPixelValue(inflated, cycle, row, colum);

      newRow.push(lookupStr[pixelIdx]);
    }

    newImage.push(newRow);
  }

  return newImage;
};

const en = enchanceImage(imageArr, 1);
const en2 = enchanceImage(en, 2);

countLit(en2);
