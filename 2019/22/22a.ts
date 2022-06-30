import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

console.log(inputArr);
class CardDeck {
  cards: number[] = [];

  constructor(numOfCards: number) {
    for (let i = 0; i < numOfCards; i++) {
      this.cards.push(i);
    }
  }

  dealNewStack() {
    this.cards = this.cards.reverse();
  }

  cut(n: number) {
    if (n >= 0) {
      const pickedUp = this.cards.splice(0, n);
      this.cards.push(...pickedUp);
    } else {
      const pickedUp = this.cards.splice(this.cards.length + n, Math.abs(n));
      this.cards.unshift(...pickedUp);
    }
  }

  dealWithIncrement(inc: number) {
    const newDeck = new Array(this.cards.length);
    newDeck.fill(-1);

    let currIdx = 0;
    let cardsDealt = 0;
    const loopSize = this.cards.length;

    while (cardsDealt < loopSize) {
      const currCard = this.cards.shift()!;
      newDeck[currIdx] = currCard;

      cardsDealt++;

      currIdx += inc;

      if (cardsDealt === loopSize) {
        break;
      }

      if (currIdx > loopSize) {
        currIdx -= loopSize;
      }

      while (newDeck[currIdx] !== -1) {
        currIdx++;
        if (currIdx > loopSize) {
          currIdx = 0;
        }
      }
    }

    this.cards = newDeck;
  }

  processInstruction(inst: [string, number]) {
    const [op, val] = inst;

    if (op === 'NEW') {
      this.dealNewStack();
    } else if (op === 'INC') {
      this.dealWithIncrement(val);
    } else {
      this.cut(val);
    }
  }
}

const deck = new CardDeck(10007);

for (let i = 0; i < inputArr.length; i++) {
  deck.processInstruction(inputArr[i]);
}

console.log(deck.cards.indexOf(2019));
