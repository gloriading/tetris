import { BOUND, SHAPES_INIT } from './constants';
import { Block, Direction, Coords, Variation, Shape } from './types';

export function handleMovement(currState: Block, key: Direction, variationCoords?: Coords[]): Block {
  const boundFns: { [key in Direction]: (coords: Coords) => boolean } = {
    [Direction.Down]: ([xCoords]: Coords) => xCoords === BOUND.DOWN,
    [Direction.Left]: ([, yCoords]: Coords) => yCoords === BOUND.LEFT,
    [Direction.Right]: ([, yCoords]: Coords) => yCoords === BOUND.RIGHT,
    [Direction.Up]: ([xCoords]: Coords) => xCoords === BOUND.DOWN,
    [Direction.Drop]: ([xCoords]: Coords) => xCoords === BOUND.DOWN,
  };

  const reducerMap: {
    [key in Direction]: (coordsArr: Coords[], coords: Coords, idx: number, originCoords: Coords[]) => Coords[];
  } = {
    [Direction.Down]: (updatedCoords, [xCoords, yCoords]) => [...updatedCoords, [xCoords + 1, yCoords]],
    [Direction.Left]: (updatedCoords, [xCoords, yCoords]) => [...updatedCoords, [xCoords, yCoords - 1]],
    [Direction.Right]: (updatedCoords, [xCoords, yCoords]) => [...updatedCoords, [xCoords, yCoords + 1]],
    [Direction.Drop]: (updatedCoords, [xCoords, yCoords], _idx, originCoords) => {
      const bottomXCoords = Math.max(...originCoords.map((_pair) => _pair[0]));
      const deviation = xCoords - bottomXCoords;
      return [...updatedCoords, [BOUND.DOWN + deviation, yCoords]];
    },
    [Direction.Up]: (updatedCoords, [xCoords, yCoords], idx) => {
      const [xDev, yDev] = (variationCoords as Coords[])[idx];
      return [...updatedCoords, [xCoords + xDev, yCoords + yDev]];
    },
  };

  const hasReachedBoundary = currState.coords.some(boundFns[key]);
  if (hasReachedBoundary) return currState;

  const newCoords = currState.coords.reduce(reducerMap[key], [] as Coords[]);

  let newVariation = currState.variation;
  if (key === Direction.Up) {
    newVariation = newVariation === Variation.END ? Variation.START : newVariation + Variation.INCREMENT;
  }

  return {
    ...currState,
    coords: newCoords,
    variation: newVariation,
  };
}

export function createGrid(row: number, column: number): string[][] {
  return Array.from({ length: row }, () => Array.from({ length: column }, (_v, i) => i.toString()));
}

export function getRandomShape(): Block {
  const letters = Object.keys(SHAPES_INIT) as Shape[];
  const randomIdx = Math.floor(Math.random() * letters.length);
  const randomLetter = letters[randomIdx];
  return SHAPES_INIT[randomLetter];
}

export function getCellType(str: string): string {
  if (!str.includes('_')) return 'basicCell';
  return str.split('_')[1];
}
