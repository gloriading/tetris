import { BOUND, SHAPES_INIT } from './constants';
import { Block, Direction, Coords, Variation, Shape } from './types';

export function handleMovement(
  currState: Block,
  key: Direction,
  preGrid: string[][],
  variationCoords?: Coords[],
): Block {
  const boundFns: { [key in Direction]: (coords: Coords) => boolean } = {
    [Direction.Down]: ([xCoords, yCoords]: Coords) => {
      const isBottom = xCoords === BOUND.DOWN;
      const isTaken = preGrid[xCoords + 1][yCoords].includes('_');
      return isBottom || isTaken;
    },
    [Direction.Left]: ([, yCoords]: Coords) => yCoords === BOUND.LEFT,
    [Direction.Right]: ([, yCoords]: Coords) => yCoords === BOUND.RIGHT,
    [Direction.Up]: ([xCoords, yCoords]: Coords) =>
      xCoords >= BOUND.DOWN || yCoords < BOUND.LEFT || yCoords > BOUND.RIGHT,
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
      // TODO: need to check all yCoords and compare to find the baseline
      const asdf = originCoords
        .map((_pair) => _pair[1])
        .map((y) => preGrid.findIndex((innerArr) => innerArr[y].includes('_')))
        .filter((val) => val !== -1);
      const baseLine = asdf.length === 0 ? BOUND.DOWN : Math.min(...asdf);
      // const bottomLine = preGrid.findIndex((innerArr) => innerArr[yCoords].includes('_'));
      // const trueX = bottomLine === -1 ? BOUND.DOWN : bottomLine;
      return [...updatedCoords, [baseLine + deviation, yCoords]];
    },
    [Direction.Up]: (updatedCoords, [xCoords, yCoords], idx) => {
      const [xDev, yDev] = (variationCoords as Coords[])[idx];
      return [...updatedCoords, [xCoords + xDev, yCoords + yDev]];
    },
  };

  const hasReachedBoundary = currState.coords.some(boundFns[key]);
  if (hasReachedBoundary) {
    console.log('has reached bound 1');
    return currState;
  }

  const newCoords = currState.coords.reduce(reducerMap[key], [] as Coords[]);

  let newVariation = currState.variation;
  if (key === Direction.Up) {
    const hasNewCoordsReachedBoundary = newCoords.some(boundFns[key]);
    if (hasNewCoordsReachedBoundary) return currState;
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

// Profiler API
/* eslint-disable */
export function logTimes(id: any, phase: any, actualTime: any, baseTime: any, startTime: any, commitTime: any): void {
  console.log(`${id}'s ${phase} phase:`);
  console.log(`Actual time: ${actualTime}`);
  console.log(`Base time: ${baseTime}`);
  console.log(`Start time: ${startTime}`);
  console.log(`Commit time: ${commitTime}`);
}