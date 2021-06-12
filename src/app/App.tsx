import React, { useState, useEffect, useCallback } from 'react';
import styles from './App.module.scss';
import { Cell } from './components';
import { SHAPES_INIT, BOUND, VARIATIONS } from './utils/constants';
import { Direction, Coords, Block, isShapeInitialized, ActionMap, isVariationInitialized } from './utils/types';

export function App(): JSX.Element {
  const START_GRID = createGrid(20, 10);
  const [grid, setGrid] = useState<string[][]>(START_GRID);
  const [currShape, setCurrShape] = useState<Block>();
  const [variation, setVariation] = useState<Coords[]>();

  const handleKeyDown = useCallback((event: KeyboardEvent): void => {
    const actionMap: ActionMap = {
      ArrowUp: () => handleMovement(Direction.Up),
      ArrowLeft: () => handleMovement(Direction.Left),
      ArrowRight: () => handleMovement(Direction.Right),
      ArrowDown: () => handleMovement(Direction.Down),
      ' ': () => handleMovement(Direction.Drop),
    };

    const action = actionMap[event.key];

    if (!action) return;
    action();
  }, []);

  function handleMovement(key: Direction): void {
    const boundFns: { [key in Direction]: (coords: Coords) => boolean } = {
      [Direction.Down]: ([x]: Coords) => x === BOUND.DOWN,
      [Direction.Left]: ([, y]: Coords) => y === BOUND.LEFT,
      [Direction.Right]: ([, y]: Coords) => y === BOUND.RIGHT,
      [Direction.Up]: ([,]: Coords) => false,
      [Direction.Drop]: ([x]: Coords) => x === BOUND.DOWN,
    };

    const reducers: {
      [key in Direction]: (coordsArr: Coords[], coords: Coords, idx: number, originCoords: Coords[]) => Coords[];
    } = {
      [Direction.Down]: (updatedCoords, pair) => {
        const [xCoords, yCoords] = pair;
        return [...updatedCoords, [xCoords + 1, yCoords]];
      },
      [Direction.Left]: (updatedCoords, pair) => {
        const [xCoords, yCoords] = pair;
        return [...updatedCoords, [xCoords, yCoords - 1]];
      },
      [Direction.Right]: (updatedCoords, pair) => {
        const [xCoords, yCoords] = pair;
        return [...updatedCoords, [xCoords, yCoords + 1]];
      },
      [Direction.Drop]: (updatedCoords, pair, _idx, originCoords) => {
        const [xCoords, yCoords] = pair;
        const bottomXCoords = Math.max(...originCoords.map((_pair) => _pair[0]));
        const deviation = xCoords - bottomXCoords;
        return [...updatedCoords, [BOUND.DOWN + deviation, yCoords]];
      },
      [Direction.Up]: (updatedCoords, pair, idx) => {
        if (!isVariationInitialized(variation)) {
          return [...updatedCoords, pair];
        }
        const [xCoords, yCoords] = pair;
        const [xDev, yDev] = variation[idx];
        return [...updatedCoords, [xCoords + xDev, yCoords + yDev]];
      },
    };

    const bounFn = boundFns[key];
    const reducer = reducers[key];

    setCurrShape((prev) => {
      if (!isShapeInitialized(prev)) return prev;
      const hasReachedBoundary = prev.coords.some(bounFn);
      if (hasReachedBoundary) return prev;

      const newCoords = prev.coords.reduce(reducer, [] as Coords[]);

      return {
        ...prev,
        coords: newCoords,
      };
    });
  }

  useEffect(() => {
    const allLetters = Object.keys(SHAPES_INIT);
    const randomIdx = Math.floor(Math.random() * allLetters.length);
    const randomLetter = allLetters[randomIdx];

    setCurrShape(SHAPES_INIT[randomLetter]);
    setVariation(VARIATIONS[randomLetter][0]);

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

  return (
    <div className={styles.app}>
      <div className={styles.gridBoard}>
        {grid.map((row) => row.map((cell) => <Cell key={`cell-${cell}`} shape={getCellType(cell)} />))}
      </div>
    </div>
  );
}
