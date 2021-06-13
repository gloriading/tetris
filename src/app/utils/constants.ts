import { Shape, Block, Direction, Coords, Variation } from './types';

export const BOUND = {
  [Direction.Right]: 9,
  [Direction.Left]: 0,
  [Direction.Down]: 21,
  [Direction.Drop]: 21,
  [Direction.Up]: 0,
};

export const SHAPES_INIT: { [key in Shape]: Block } = {
  [Shape.L]: {
    name: Shape.L,
    coords: [
      [0, 5],
      [1, 5],
      [1, 4],
      [1, 3],
    ],
    variation: Variation.START,
  },
  [Shape.I]: {
    name: Shape.I,
    coords: [
      [1, 3],
      [1, 4],
      [1, 5],
      [1, 6],
    ],
    variation: Variation.START,
  },
  [Shape.T]: {
    name: Shape.T,
    coords: [
      [0, 4],
      [1, 3],
      [1, 4],
      [1, 5],
    ],
    variation: Variation.START,
  },
  [Shape.O]: {
    name: Shape.O,
    coords: [
      [0, 4],
      [0, 5],
      [1, 4],
      [1, 5],
    ],
    variation: Variation.START,
  },
  [Shape.S]: {
    name: Shape.S,
    coords: [
      [0, 5],
      [0, 4],
      [1, 4],
      [1, 3],
    ],
    variation: Variation.START,
  },
  [Shape.Z]: {
    name: Shape.Z,
    coords: [
      [0, 3],
      [0, 4],
      [1, 4],
      [1, 5],
    ],
    variation: Variation.START,
  },
  [Shape.J]: {
    name: Shape.J,
    coords: [
      [0, 3],
      [1, 3],
      [1, 4],
      [1, 5],
    ],
    variation: Variation.START,
  },
};

export const SHAPE_VARIATIONS: { [key in Shape]: Coords[][] } = {
  [Shape.L]: [
    [
      [2, 0],
      [1, -1],
      [0, 0],
      [-1, 1],
    ],
    [
      [0, -2],
      [-1, -1],
      [0, 0],
      [1, 1],
    ],
    [
      [-2, 0],
      [-1, 1],
      [0, 0],
      [1, -1],
    ],
    [
      [0, 2],
      [1, 1],
      [0, 0],
      [-1, -1],
    ],
  ],
  [Shape.I]: [
    [
      [-1, 2],
      [0, 1],
      [1, 0],
      [2, -1],
    ],
    [
      [2, 1],
      [1, 0],
      [0, -1],
      [-1, -2],
    ],
    [
      [1, -2],
      [0, -1],
      [-1, 0],
      [-2, 1],
    ],
    [
      [-2, -1],
      [-1, 0],
      [0, 1],
      [1, 2],
    ],
  ],
  [Shape.T]: [
    [
      [1, 1],
      [-1, 1],
      [0, 0],
      [1, -1],
    ],
    [
      [1, -1],
      [1, 1],
      [0, 0],
      [-1, -1],
    ],
    [
      [-1, -1],
      [1, -1],
      [0, 0],
      [-1, 1],
    ],
    [
      [-1, 1],
      [-1, -1],
      [0, 0],
      [1, 1],
    ],
  ],
  [Shape.O]: [
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ],
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ],
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ],
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ],
  ],
  [Shape.S]: [
    [
      [2, 0],
      [1, 1],
      [0, 0],
      [-1, 1],
    ],
    [
      [0, -2],
      [1, -1],
      [0, 0],
      [1, 1],
    ],
    [
      [-2, 0],
      [-1, -1],
      [0, 0],
      [1, -1],
    ],
    [
      [0, 2],
      [-1, 1],
      [0, 0],
      [-1, -1],
    ],
  ],
  [Shape.Z]: [
    [
      [0, 2],
      [1, 1],
      [0, 0],
      [1, -1],
    ],
    [
      [2, 0],
      [1, -1],
      [0, 0],
      [-1, -1],
    ],
    [
      [0, -2],
      [-1, -1],
      [0, 0],
      [-1, 1],
    ],
    [
      [-2, 0],
      [-1, 1],
      [0, 0],
      [1, 1],
    ],
  ],
  [Shape.J]: [
    [
      [0, 2],
      [-1, 1],
      [0, 0],
      [1, -1],
    ],
    [
      [2, 0],
      [1, 1],
      [0, 0],
      [-1, -1],
    ],
    [
      [0, -2],
      [1, -1],
      [0, 0],
      [-1, 1],
    ],
    [
      [-2, 0],
      [-1, -1],
      [0, 0],
      [1, 1],
    ],
  ],
};
