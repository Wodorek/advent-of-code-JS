const countOccupied = (seats: string[]) => {
  let taken = 0;

  seats.forEach((row) => {
    row.split('').forEach((seat) => {
      if (seat === '#') {
        taken++;
      }
    });
  });

  console.log(taken);
  return taken;
};

export default countOccupied;
