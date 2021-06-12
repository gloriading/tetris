import { Shape, Block, Direction, Coords } from './types';

export const BOUND = {
  [Direction.Right]: 9,
  [Direction.Left]: 0,
  [Direction.Down]: 19,
  [Direction.Drop]: 19,
  [Direction.Up]: 0,
};

export const SHAPES_INIT: { [key in Shape]: Block } = {
  [Shape.L]: {
    name: Shape.L,
    coords: [
      [0, 4],
      [1, 4],
      [2, 4],
      [2, 5],
    ],
  },
  // [Shape.I]: {
  //   name: Shape.I,
  //   coords: [
  //     [0, 4],
  //     [1, 4],
  //     [2, 4],
  //     [3, 4],
  //   ],
  // },
  // [Shape.T]: {
  //   name: Shape.T,
  //   coords: [
  //     [0, 4],
  //     [0, 5],
  //     [0, 6],
  //     [1, 5],
  //   ],
  // },
  // [Shape.O]: {
  //   name: Shape.O,
  //   coords: [
  //     [0, 4],
  //     [0, 5],
  //     [1, 4],
  //     [1, 5],
  //   ],
  // },
  // [Shape.S]: {
  //   name: Shape.S,
  //   coords: [
  //     [0, 4],
  //     [0, 5],
  //     [1, 3],
  //     [1, 4],
  //   ],
  // },
  // [Shape.Z]: {
  //   name: Shape.Z,
  //   coords: [
  //     [0, 4],
  //     [0, 5],
  //     [1, 5],
  //     [1, 6],
  //   ],
  // },
  // [Shape.J]: {
  //   name: Shape.J,
  //   coords: [
  //     [0, 5],
  //     [1, 5],
  //     [2, 5],
  //     [2, 4],
  //   ],
  // },
};

export const VARIATIONS: { [key in Shape]: Coords[][] } = {
  [Shape.L]: [
    [
      [1, 1],
      [0, 0],
      [-1, -1],
      [1, -2],
    ],
    [
      [-1, -1],
      [0, 0],
      [-1, 1],
      [-3, 0],
    ],
    [
      [-1, -1],
      [0, 0],
      [-1, 1],
      [0, 2],
    ],
    [
      [-1, 1],
      [0, 0],
      [1, -1],
      [2, 0],
    ],
  ],
};
