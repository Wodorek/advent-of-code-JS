import prepareInput from './helpers/prepareInput';
import input from './input';

let bits = prepareInput(input);

let versionTotals = 0;
const packetStruct: {
  [key: string]: {
    type: number;
    subpackets: number[];
    values: number[];
  };
} = {};

//read the packets
const readPacket = (idx: number) => {
  const version = parseInt(bits.slice(idx, idx + 3), 2);

  versionTotals += version;
  const ID = parseInt(bits.slice(idx + 3, idx + 6), 2);

  const packetIdent = idx;
  packetStruct[packetIdent] = {
    type: ID,
    subpackets: [],
    values: [],
  };

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
    packetStruct[packetIdent].values.push(parseInt(val, 2));
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
      packetStruct[packetIdent].subpackets.push(newIdx);
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
      packetStruct[packetIdent].subpackets.push(newIdx);
      newIdx = readPacket(newIdx);
      idx += newIdx - idx;
    }
    return newIdx;
  }
  return -1;
};

readPacket(0);

console.log(packetStruct);

const getPacketValue = (key: number = 0): number => {
  const packet = packetStruct[key];
  const type = packet.type;
  const subpackets = packet.subpackets;
  const accValues: number[] = [];

  subpackets.forEach((sub) => {
    const subVal = getPacketValue(sub);
    accValues.push(subVal);
  });

  let val = 0;

  if (type === 0) {
    if (key === 0) {
      console.log(accValues);
    }
    val = accValues.reduce((prev, val) => {
      return prev + val;
    });
  }

  if (type === 1) {
    val = accValues.reduce((prev, val) => {
      return prev * val;
    });
  }

  if (type === 2) {
    val = Math.min(...accValues);
  }

  if (type === 3) {
    val = Math.max(...accValues);
  }

  if (type === 4) {
    val = packet.values[0];
  }

  if (type === 5) {
    const firstPackVal = getPacketValue(subpackets[0]);
    const secondPackVal = getPacketValue(subpackets[1]);

    val = firstPackVal > secondPackVal ? 1 : 0;
  }

  if (type === 6) {
    const firstPackVal = getPacketValue(subpackets[0]);
    const secondPackVal = getPacketValue(subpackets[1]);
    val = firstPackVal > secondPackVal ? 0 : 1;
  }

  if (type === 7) {
    const firstPackVal = getPacketValue(subpackets[0]);
    const secondPackVal = getPacketValue(subpackets[1]);

    val = firstPackVal === secondPackVal ? 1 : 0;
  }

  return val;
};

let totalVal = getPacketValue();

console.log(totalVal);
