import { useEffect, useRef } from 'react';
import { Callback } from './types';

export default function useInterval(callback: Callback, delay: number | null): void {
  const savedCallback = useRef<Callback>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      const callbackFn = savedCallback.current as Callback;
      callbackFn();
    }

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
