/* eslint-disable @typescript-eslint/no-redeclare */
import React from 'react';
import styles from './Cell.module.scss';

interface Cell {
  shape: string;
}

function Cell({ shape }: Cell): JSX.Element {
  return <div className={styles[shape]} />;
}

export default Cell;
