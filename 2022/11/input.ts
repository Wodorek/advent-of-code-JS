const input = `Monkey 0:
  Starting items: 89, 74
  Operation: new = old * 5
  Test: divisible by 17
    If true: throw to monkey 4
    If false: throw to monkey 7

Monkey 1:
  Starting items: 75, 69, 87, 57, 84, 90, 66, 50
  Operation: new = old + 3
  Test: divisible by 7
    If true: throw to monkey 3
    If false: throw to monkey 2

Monkey 2:
  Starting items: 55
  Operation: new = old + 7
  Test: divisible by 13
    If true: throw to monkey 0
    If false: throw to monkey 7

Monkey 3:
  Starting items: 69, 82, 69, 56, 68
  Operation: new = old + 5
  Test: divisible by 2
    If true: throw to monkey 0
    If false: throw to monkey 2

Monkey 4:
  Starting items: 72, 97, 50
  Operation: new = old + 2
  Test: divisible by 19
    If true: throw to monkey 6
    If false: throw to monkey 5

Monkey 5:
  Starting items: 90, 84, 56, 92, 91, 91
  Operation: new = old * 19
  Test: divisible by 3
    If true: throw to monkey 6
    If false: throw to monkey 1

Monkey 6:
  Starting items: 63, 93, 55, 53
  Operation: new = old * old
  Test: divisible by 5
    If true: throw to monkey 3
    If false: throw to monkey 1

Monkey 7:
  Starting items: 50, 61, 52, 58, 86, 68, 97
  Operation: new = old + 4
  Test: divisible by 11
    If true: throw to monkey 5
    If false: throw to monkey 4`;

export default input;
