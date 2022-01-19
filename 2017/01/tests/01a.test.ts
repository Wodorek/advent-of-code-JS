import countDigits from '../01a';

test('should work with example 1', () => {
  expect(countDigits('1122')).toBe(3);
});

test('should work with example 2', () => {
  expect(countDigits('1111')).toBe(4);
});

test('should work with example 3', () => {
  expect(countDigits('1234')).toBe(0);
});

test('should work with example 4', () => {
  expect(countDigits('91212129')).toBe(9);
});
