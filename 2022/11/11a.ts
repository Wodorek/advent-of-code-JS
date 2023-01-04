import input from './input';
import prepareInput, { IMonkey } from './helpers/prepareInput';

const inputArr = prepareInput(input);

class Monkeys {
  monkeys: { [key: number]: IMonkey } = {};

  constructor(monkeys: IMonkey[]) {
    monkeys.forEach((monkey) => {
      this.monkeys[monkey.id] = monkey;
    });
  }

  playTurn(monkey: IMonkey) {
    while (monkey.items.length > 0) {
      const item = monkey.items.shift()!;
      monkey.inspections++;

      let newVal = monkey.operation(item);
      newVal = Math.floor(newVal / 3);

      const throwTo = monkey.test(newVal);

      this.monkeys[throwTo].items.push(newVal);
    }
  }

  playRound() {
    Object.keys(this.monkeys).forEach((key) => {
      const monkey = this.monkeys[+key];

      this.playTurn(monkey);
    });
  }

  calcMonkeyBusiness() {
    const sorted = Object.values(this.monkeys).sort((a, b) => {
      return b.inspections - a.inspections;
    });

    return sorted[0].inspections * sorted[1].inspections;
  }
}

const monkeys = new Monkeys(inputArr);

for (let i = 0; i < 20; i++) {
  monkeys.playRound();
}

console.log(monkeys.monkeys);
console.log(monkeys.calcMonkeyBusiness());
