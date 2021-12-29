export interface Submarine {
  direction: 'E' | 'N' | 'S' | 'W';
  location: {
    N: number;
    E: number;
  };
}
