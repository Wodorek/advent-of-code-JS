import containsEvery from './containsEvery';

const mapInputToDigits = (input: string) => {
  const inputArr = input.split(' ');

  const digits: { [key: number]: string } = {
    0: '',
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
    6: '',
    7: '',
    8: '',
    9: '',
  };

  //  0000
  // 1    2
  // 1    2
  //  3333
  // 4    5
  // 4    5
  //  6666

  const segments = {
    0: '',
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
    6: '',
  };

  //step 1) Assign the obvious ones:
  inputArr.forEach((el, idx) => {
    //1
    if (el.length === 2) {
      digits[1] = el;
    }

    //4
    if (el.length === 4) {
      digits[4] = el;
    }

    //7
    if (el.length === 3) {
      digits[7] = el;
    }

    //8
    if (el.length === 7) {
      digits[8] = el;
    }
  });

  //step 2) find the 0 segment
  const segmentsOf1 = digits[1].split('');
  const segmentsOf7 = digits[7].split('');

  segments[0] = segmentsOf7.filter((x) => !segmentsOf1.includes(x))[0];

  //step 3) find the 6 segment and the 9 digit
  const segmentsOf4 = digits[4].split('');
  inputArr.forEach((el) => {
    if (el.length === 6 && containsEvery(segmentsOf4, el.split(''))) {
      segments[6] = el.split('').filter((x) => !segmentsOf4.includes(x))[0];
      digits[9] = el;
    }
  });

  //step 4) find 2 and 4 segments, and 6 and 0 digits
  const segmentsOf9 = digits[9].split('');
  inputArr.forEach((el) => {
    if (el.length === 6 && el !== digits[9]) {
      const elSegments = el.split('');

      if (containsEvery(segmentsOf7, elSegments)) {
        digits[0] = el;
      } else {
        digits[6] = el;
        segments[2] = segmentsOf9.filter((x) => !elSegments.includes(x))[0];
        segments[4] = elSegments.filter((x) => !segmentsOf9.includes(x))[0];
      }
    }
  });

  //step 5) find 2 3 and 5 digits
  inputArr.forEach((el) => {
    if (el.length === 5) {
      const elSegments = el.split('');

      if (containsEvery(segmentsOf1, elSegments)) {
        digits[3] = el;
      } else if (elSegments.includes(segments[4])) {
        digits[2] = el;
      } else {
        digits[5] = el;
      }
    }
  });
  return digits;
};

export default mapInputToDigits;
