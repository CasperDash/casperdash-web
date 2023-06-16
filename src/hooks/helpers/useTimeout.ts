import { useCallback, useEffect, useRef, useState } from 'react';

export const useTimeout = (cb: () => void, delay: number) => {
  const saveCb = useRef<() => void>();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [timeoutId, setTimeoutId] = useState<string | number>(null!);

  useEffect(() => {
    saveCb.current = cb;
  }, [cb]);

  useEffect(() => {
    if (timeoutId !== 'start') {
      return undefined;
    }

    const id = setTimeout(() => {
      saveCb?.current?.();
    }, delay);

    setTimeoutId(id as unknown as string);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [delay, timeoutId]);

  const startTimeout = useCallback(() => {
    clearTimeout(timeoutId);
    setTimeoutId('start');
  }, [timeoutId]);

  return startTimeout;
};
