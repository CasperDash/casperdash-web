import { useCallback } from 'react';

import { useFormContext } from 'react-hook-form';

import useCalculateAmountOut from './useCalculateAmountOut';

export const useSetValueSwapFrom = () => {
  const { setValue } = useFormContext();
  const handleChangeAmountOut = useCalculateAmountOut();

  const setValueSwapFrom = useCallback(
    (value: number) => {
      setValue('swapFrom.amount', value);
      handleChangeAmountOut(value);
    },
    [handleChangeAmountOut, setValue]
  );

  return setValueSwapFrom;
};
