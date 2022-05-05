export interface Cube {
  x: number[];
  y: number[];
  z: number[];
}

export type Action = [1 | 0, Cube];
