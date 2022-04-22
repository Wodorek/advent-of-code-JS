import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const width = 25;
const height = 6;

const layers: number[][][] = [];

let idx = 0;

for (let i = 0; i < inputArr.length / (width * height); i++) {
  const layer: number[][] = [];

  for (let h = 0; h < height; h++) {
    const row: number[] = [];

    for (let w = 0; w < width; w++) {
      row.push(inputArr[idx]);
      idx++;
    }
    layer.push(row);
  }
  layers.push(layer);
}

function drawPixels(layers: number[][][]) {
  const output = layers[0];

  layers.forEach((layer) => {
    layer.forEach((row, rowIdx) => {
      row.forEach((pixel, piIdx) => {
        if (output[rowIdx][piIdx] === 2) {
          output[rowIdx][piIdx] = pixel;
        }
      });
    });
  });

  const image = output.map((el) => {
    return el.map((pixel) => {
      if (pixel === 1) {
        return '#';
      } else {
        return ' ';
      }
    });
  });

  image.forEach((row) => {
    console.log(row.join(''));
  });
}

drawPixels(layers);
