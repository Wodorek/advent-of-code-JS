const getDisplayedNumber = (
  signals: { [key: number]: string },
  display: string
) => {
  //reverse keys and values, for ease of access
  const lookup = Object.assign(
    {},
    ...Object.entries(signals).map(([a, b]) => ({
      [b.split('').sort().join('')]: a,
    }))
  );

  let number = '';

  const digits = display.split(' ');

  digits.forEach((digit) => {
    const idx = digit.split('').sort().join('');
    number = number + lookup[idx];
  });

  return +number;
};

export default getDisplayedNumber;
