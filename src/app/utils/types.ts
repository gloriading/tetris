// TYPE
export type Coords = [number, number];
export type Callback = () => void;

// INTERFACE
export interface Block {
  name: Shape;
  coords: Coords[];
  variation: number;
}

export interface ActionMap {
  [key: string]: Direction;
}

export interface ActionType {
  type: Shape | Direction;
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

export enum Variation {
  START = 0,
  END = 3,
  INCREMENT = 1,
}

// TYPE GUARDS
export function isShapeInitialized(shape: Block | undefined): shape is Block {
  return shape !== undefined;
}

export function isActionTypeShape(type: Shape | Direction): type is Shape {
  return type in Shape;
}
