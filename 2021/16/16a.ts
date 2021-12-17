import prepareInput from './helpers/prepareInput';
import input from './input';

let bits = prepareInput(input);

let versionTotals = 0;

const readPacket = (idx: number) => {
  const version = parseInt(bits.slice(idx, idx + 3), 2);

  versionTotals += version;
  const ID = parseInt(bits.slice(idx + 3, idx + 6), 2);

  if (idx > bits.length - 4) {
    return -1;
  }

  if (+ID === 4) {
    idx += 6;
    let keepReading = true;
    let val = '';

    while (keepReading) {
      const label = bits[idx];
      if (+label === 0) {
        keepReading = false;
      }
      const part = bits.slice(idx + 1, idx + 5);
      val = val.concat(part);
      idx += 5;
    }
    return idx;
  }

  const lenType = bits[idx + 6];

  if (+lenType === 0) {
    const bitLen = parseInt(bits.slice(idx + 7, idx + 7 + 15), 2);
    idx += 7 + 15;
    let stop = false;
    let processed = 0;
    let newIdx = idx;

    while (!stop) {
      if (processed === bitLen) {
        break;
      }
      newIdx = readPacket(newIdx);
      processed += newIdx - idx;
      idx += newIdx - idx;
    }
    return newIdx;
  }

  if (+lenType === 1) {
    const subPackNum = parseInt(bits.slice(idx + 7, idx + 18), 2);
    idx += 18;
    let newIdx = idx;

    for (let i = 0; i < subPackNum; i++) {
      newIdx = readPacket(newIdx);
      idx += newIdx - idx;
    }
    return newIdx;
  }
  return -1;
};

readPacket(0);

console.log(versionTotals);
