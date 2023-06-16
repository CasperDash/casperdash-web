import { useCallback } from 'react';

import { useAppDispatch } from '@/store';
import { safeResetSensitive as safeResetSensitiveAction } from '@/store/wallet';

export const useSafeResetSensitive = () => {
  const dispatch = useAppDispatch();
  const safeResetSensitive = useCallback(() => {
    dispatch(safeResetSensitiveAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    safeResetSensitive,
  };
};
