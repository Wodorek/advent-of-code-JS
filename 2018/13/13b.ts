import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

interface cart {
  id: string;
  position: [number, number];
  facing: [number, number];
  turnsTaken: number;
}

let carts: cart[] = [];

// find carts
inputArr.forEach((row, y) => {
  row.forEach((col, x) => {
    if (col === '^' || col === 'v' || col === '<' || col === '>') {
      const cart: cart = {
        id: `${x}${y}`,
        position: [x, y],
        facing: [0, 0],
        turnsTaken: 0,
      };

      if (col === '^') {
        cart.facing = [0, -1];
        inputArr[y][x] = '|';
      }

      if (col === 'v') {
        cart.facing = [0, 1];
        inputArr[y][x] = '|';
      }

      if (col === '>') {
        cart.facing = [1, 0];
        inputArr[y][x] = '-';
      }

      if (col === '<') {
        cart.facing = [-1, 0];
        inputArr[y][x] = '-';
      }

      carts.push(cart);
    }
  });
});

const turnCart = (
  facing: [number, number],
  turn: 1 | 0 | -1
): [number, number] => {
  const directions = ['0,-1', '1,0', '0,1', '-1,0'];

  const asStr = `${facing[0]},${facing[1]}`;

  const currIdx = directions.indexOf(asStr);

  if (turn === 1) {
    const dir = directions[currIdx + 1] || directions[0];

    return dir.split(',').map(Number) as [number, number];
  }

  if (turn === -1) {
    const dir = directions[currIdx - 1] || directions[3];

    return dir.split(',').map(Number) as [number, number];
  }

  const dir = directions[currIdx];
  return dir.split(',').map(Number) as [number, number];
};

const checkForCrashes = (cart: cart) => {
  for (let i = 0; i < carts.length; i++) {
    const checked = carts[i];

    if (
      checked.position[0] === cart.position[0] &&
      checked.position[1] === cart.position[1] &&
      checked.id !== cart.id
    ) {
      return `${cart.position[0]},${cart.position[1]}`;
    }
  }

  return '';
};

const moveCart = (track: string[][], cart: cart) => {
  const turns: [-1, 0, 1] = [-1, 0, 1];

  cart.position[0] += cart.facing[0];
  cart.position[1] += cart.facing[1];

  const trackPosition = track[cart.position[1]][cart.position[0]];

  if (trackPosition === '/') {
    if (cart.facing[0] === -1 || cart.facing[0] === 1) {
      cart.facing = turnCart(cart.facing, -1);
    } else {
      cart.facing = turnCart(cart.facing, 1);
    }
  }

  if (trackPosition === '\\') {
    if (cart.facing[1] === 1 || cart.facing[1] === -1) {
      cart.facing = turnCart(cart.facing, -1);
    } else {
      cart.facing = turnCart(cart.facing, 1);
    }
  }

  if (trackPosition === '+') {
    cart.facing = turnCart(cart.facing, turns[cart.turnsTaken]);
    cart.turnsTaken++;

    if (cart.turnsTaken > 2) {
      cart.turnsTaken = 0;
    }
  }
};

while (carts.length > 1) {
  carts.sort((a, b) => {
    if (
      a.position[1] > b.position[1] ||
      (a.position[1] === b.position[1] && a.position[0] > b.position[0])
    )
      return 1;
    if (a.position[1] === b.position[1] && a.position[0] === b.position[0])
      return 0;
    return -1;
  });

  const crashedIds: string[] = [];

  for (let i = 0; i < carts.length; i++) {
    const cart = carts[i];

    moveCart(inputArr, cart);
    const crash = checkForCrashes(cart);

    if (crash) {
      carts.forEach((cart) => {
        if (`${cart.position[0]},${cart.position[1]}` === crash) {
          crashedIds.push(cart.id);
        }
      });
    }
  }

  carts = carts.filter((cart) => {
    return !crashedIds.includes(cart.id);
  });
}

console.log(carts[0].position.join(','));
