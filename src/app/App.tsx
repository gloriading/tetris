import React, { useState, useEffect, useReducer } from 'react';
import styles from './App.module.scss';
import { Cell } from './components';
import { SHAPES_INIT, BOUND, SHAPE_VARIATIONS } from './utils/constants';
import { Direction, Coords, Block, isShapeInitialized, ActionMap, Shape, ActionType, Variation } from './utils/types';

export function App(): JSX.Element {
  const START_GRID = createGrid(22, 10);
  const [grid, setGrid] = useState<string[][]>(START_GRID);

  const initialState: Block = getRandomShape();
  const [currShape, shapeDispatch] = useReducer<React.Reducer<Block, ActionType>>(reducer, initialState);

  function reducer(state: Block, action: ActionType): Block {
    if (!isShapeInitialized(state)) return state;
    const variationCoords = SHAPE_VARIATIONS[state.name][state.variation];

    switch (action.type) {
      case Direction.Up:
        return handleMovement(state, Direction.Up, variationCoords);
      case Direction.Left:
        return handleMovement(state, Direction.Left);
      case Direction.Right:
        return handleMovement(state, Direction.Right);
      case Direction.Down:
        return handleMovement(state, Direction.Down);
      case Direction.Drop:
        return handleMovement(state, Direction.Drop);
      default:
        return state;
    }
  }

  const handleKeyDown = (event: KeyboardEvent): void => {
    const typeMap: ActionMap = {
      ArrowRight: Direction.Right,
      ArrowLeft: Direction.Left,
      ArrowDown: Direction.Down,
      ArrowUp: Direction.Up,
      ' ': Direction.Drop,
    };

    const actionType = typeMap[event.key];
    if (!actionType) return;

    shapeDispatch({ type: actionType });
  };

  function handleMovement(currState: Block, key: Direction, variationCoords?: Coords[]): Block {
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

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, false);

    return () => {
      document.removeEventListener('keydown', handleKeyDown, false);
    };
  }, []);

  useEffect(() => {
    if (isShapeInitialized(currShape)) {
      updateLocation(currShape);
    }
  }, [currShape]);

  function updateLocation(blockType: Block) {
    const clonedGrid = [...START_GRID];
    blockType.coords.forEach(([x, y]) => {
      const temp = clonedGrid[x][y];
      clonedGrid[x][y] = `${temp}_${blockType.name}`;
    });

    setGrid(clonedGrid);
  }

  function getCellType(str: string): string {
    if (!str.includes('_')) return 'basicCell';
    return str.split('_')[1];
  }

  function createGrid(row: number, column: number): string[][] {
    return Array.from({ length: row }, () => Array.from({ length: column }, (_v, i) => i.toString()));
  }

  function getRandomShape(): Block {
    const allLetters = Object.keys(SHAPES_INIT) as Shape[];
    const randomIdx = Math.floor(Math.random() * allLetters.length);
    const randomLetter = allLetters[randomIdx];
    return SHAPES_INIT[randomLetter];
  }

  return (
    <div className={styles.app}>
      <div className={styles.gridBoard}>
        {grid.map((row) => row.map((cell) => <Cell key={`cell-${cell}`} shape={getCellType(cell)} />))}
      </div>
    </div>
  );
}
