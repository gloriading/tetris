import React, { useState, useEffect, useReducer } from 'react';
import styles from './App.module.scss';
import { Cell } from './components';
import { BOUND, SHAPE_VARIATIONS } from './utils/constants';
import { Direction, Block, ActionMap, ActionType, Command, isDirection } from './utils/types';
import useInterval from './utils/useInterval';
import { handleMovement, createGrid, getRandomShape, getCellType } from './utils/helpers';

export function App(): JSX.Element {
  const START_GRID = createGrid(22, 10);
  const [preGrid, setPreGrid] = useState<string[][]>(START_GRID);
  const [grid, setGrid] = useState<string[][]>(START_GRID);
  const [delay, setDelay] = useState<number>(2000);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [currShape, shapeDispatch] = useReducer<React.Reducer<Block, ActionType>>(shapeReducer, getRandomShape());

  function shapeReducer(state: Block, action: ActionType): Block {
    if (action.type === Command.NEXT_BLOCK) {
      return getRandomShape();
    }
    if (isDirection(action.type)) {
      return handleMovement(state, action.type, SHAPE_VARIATIONS[state.name][state.variation]);
    }
    return state;
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

  useInterval(
    () => {
      shapeDispatch({ type: Direction.Down });
    },
    isRunning ? delay : null,
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, false);

    return () => {
      document.removeEventListener('keydown', handleKeyDown, false);
    };
  }, []);

  useEffect(() => {
    if (currShape.coords.some(([xCoords]) => xCoords === BOUND.DOWN)) {
      setIsRunning(false);
    }

    updateGrid(currShape);
  }, [currShape]);

  useEffect(() => {
    if (isRunning) return;
    setPreGrid(grid);
    shapeDispatch({ type: Command.NEXT_BLOCK });
    setIsRunning(true);
  }, [isRunning]);

  function updateGrid(blockType: Block) {
    const clonedGrid = JSON.parse(JSON.stringify(preGrid)) as string[][];
    blockType.coords.forEach(([x, y]) => {
      const temp = clonedGrid[x][y];
      clonedGrid[x][y] = `${temp}_${blockType.name}`;
    });

    setGrid(clonedGrid);
  }

  return (
    <div className={styles.app}>
      <div className={styles.gridBoard}>
        {grid.map((row) => row.map((cell) => <Cell key={`cell-${cell}`} shape={getCellType(cell)} />))}
      </div>
    </div>
  );
}
