import createNextRow from '../18a';

test('works with short example', () => {
  expect(createNextRow('..^^.')).toBe('.^^^^');
});

test('works for the whole solution', () => {
  const rows = ['.^^.^.^^^^'];

  for (let i = 0; i < 9; i++) {
    const currRow = rows[rows.length - 1];

    rows.push(createNextRow(currRow));
  }

  expect(rows).toStrictEqual([
    '.^^.^.^^^^',
    '^^^...^..^',
    '^.^^.^.^^.',
    '..^^...^^^',
    '.^^^^.^^.^',
    '^^..^.^^..',
    '^^^^..^^^.',
    '^..^^^^.^^',
    '.^^^..^.^^',
    '^^.^^^..^^',
  ]);
});
