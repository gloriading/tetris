// TYPE
export type Coords = [number, number];

// INTERFACE
export interface Block {
  name: string;
  coords: Coords[];
}

// TYPE GUARDS
export function isShapeInitialized(shape: Block | undefined): shape is Block {
  return shape !== undefined;
}

// ENUM
export enum Shape {
  L = 'L',
  I = 'I',
  T = 'T',
  O = 'O',
  S = 'S',
  Z = 'Z',
  J = 'J',
}

export enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}
