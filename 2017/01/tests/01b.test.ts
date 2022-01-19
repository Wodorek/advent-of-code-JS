import countDigits from '../01b';

test('should work with example 1', () => {
  expect(countDigits('1212')).toBe(6);
});

test('should work with example 2', () => {
  expect(countDigits('1221')).toBe(0);
});

test('should work with example 3', () => {
  expect(countDigits('123425')).toBe(4);
});

test('should work with example 4', () => {
  expect(countDigits('123123')).toBe(12);
});

test('should work with example 5', () => {
  expect(countDigits('12131415')).toBe(4);
});
