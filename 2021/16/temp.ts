import prepareInput from './helpers/prepareInput';
import input from './input';

let inputStr = prepareInput(input);

const subpackets = [inputStr];

let versionSum = 0;

const readPacket = (bits: string) => {
  const version = parseInt(bits.slice(0, 3), 2);

  versionSum += version;

  const ID = parseInt(bits.slice(3, 6), 2);

  let segment = 0;
  if (+ID === 4) {
    let keepReading = true;
    let val = '';

    while (keepReading) {
      const label = bits[6 + 5 * segment];
      if (+label === 0) {
        keepReading = false;
      }
      const part = bits.slice(7 + 5 * segment, 11 + 5 * segment);
      val = val.concat(part);
      segment++;
    }

    console.log('literal value packet, value: ', parseInt(val, 2));
  }

  const lenType = bits[6];

  if (+lenType === 0 && +ID !== 4) {
    const bitLen = parseInt(bits.slice(7, 22), 2);
    subpackets.push(bits.slice(22, 22 + bitLen));
    return;
  }

  if (+lenType === 1 && +ID !== 4) {
    const subPackNum = parseInt(bits.slice(7, 18), 2);
    subpackets.push(bits.slice(18, bits.length));
    return;
  }

  if (bits.slice(6 + segment * 5, bits.length).length > 10) {
    subpackets.push(bits.slice(6 + segment * 5, bits.length));
  }
};

while (subpackets.length > 0) {
  const pack = subpackets.pop()!;

  readPacket(pack);
}

console.log(versionSum);
