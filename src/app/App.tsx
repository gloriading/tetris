import React, { useState } from 'react';
import styles from './App.module.scss';
import { Cell } from './components';

export function App(): JSX.Element {
  const [grid, setGrid] = useState(createMatrix(10));

  function createMatrix(n: number): number[][] {
    return Array.from({ length: n }, () => Array.from({ length: n }, (v, i) => i));
  }

  return (
    <div className={styles.app}>
      <div className={styles.gridBoard}>{grid.map((row) => row.map((cell) => <Cell key={`cell-${cell}`} />))}</div>
    </div>
  );
}
