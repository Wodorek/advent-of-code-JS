import yetAnotherBfs from '../17b';

test('works with example 1', () => {
  expect(yetAnotherBfs('ihgpwlah')).toBe(370);
});

test('works with example 2', () => {
  expect(yetAnotherBfs('kglvqrro')).toBe(492);
});

test('works with example 3', () => {
  expect(yetAnotherBfs('ulqzkmiv')).toBe(830);
});
