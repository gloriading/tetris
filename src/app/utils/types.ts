// TYPE
export type Coords = [number, number];
export type Action = () => void;

// INTERFACE
export interface Block {
  name: string;
  coords: Coords[];
}

export interface ActionMap {
  [key: string]: Action;
}

// TYPE GUARDS
export function isShapeInitialized(shape: Block | undefined): shape is Block {
  return shape !== undefined;
}

export function isVariationInitialized(variation: Coords[] | undefined): variation is Coords[] {
  return variation !== undefined;
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
  Drop = 'DROP',
}
