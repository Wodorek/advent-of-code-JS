import yetAnotherBfs from '../17a';

test('works with example 1', () => {
  expect(yetAnotherBfs('ihgpwlah')).toBe('DDRRRD');
});

test('works with example 2', () => {
  expect(yetAnotherBfs('kglvqrro')).toBe('DDUDRLRRUDRD');
});

test('works with example 3', () => {
  expect(yetAnotherBfs('ulqzkmiv')).toBe('DRURDRUDDLLDLUURRDULRLDUUDDDRR');
});
