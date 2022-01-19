import md5 from 'md5';

const isOpen = (str: string, x: number, y: number) => {
  const openers = ['b', 'c', 'd', 'e', 'f'];

  const hash = md5(str);

  const keys = [hash[0], hash[1], hash[2], hash[3]];

  const openedDoors: [number, number][] = [];

  keys.forEach((key, idx) => {
    if (openers.includes(key)) {
      if (idx === 0) {
        if (y - 1 >= 0) {
          openedDoors.push([x, y - 1]);
        } else {
          openedDoors.push([-1, -1]);
        }
      }

      if (idx === 1) {
        if (y + 1 <= 3) {
          openedDoors.push([x, y + 1]);
        } else {
          openedDoors.push([-1, -1]);
        }
      }

      if (idx === 2) {
        if (x - 1 >= 0) {
          openedDoors.push([x - 1, y]);
        } else {
          openedDoors.push([-1, -1]);
        }
      }

      if (idx === 3) {
        if (x + 1 <= 3) {
          openedDoors.push([x + 1, y]);
        } else {
          openedDoors.push([-1, -1]);
        }
      }
    } else {
      openedDoors.push([-1, -1]);
    }
  });

  return openedDoors;
};

export default isOpen;
