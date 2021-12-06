/**
 * Gets total number of fish in timers
 *
 * @param timers An object of timers, where key represents how long until new fish is bred, and values represent number of fish
 * @returns total number of fish
 */
const getFishPopulation = (timers: { [key: number]: number }) => {
  const values = Object.values(timers);
  const population = values.reduce((prev, val) => {
    return prev + val;
  });
  return population;
};
export default getFishPopulation;
