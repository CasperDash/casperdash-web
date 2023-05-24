import { useFormContext, useWatch } from 'react-hook-form';

import {
  useGetSwapAMMPair,
  UseGetSwapAMMPairData,
  UseGetSwapAMMPairOption,
} from './useGetSwapAMMPair';
import { Token } from '@/services/friendlyMarket/tokens';

export const useGetCurrentAMMPair = (
  options: UseGetSwapAMMPairOption = {}
): UseGetSwapAMMPairData => {
  const { control } = useFormContext();

  const swapFrom: Token = useWatch({
    control,
    name: 'swapFrom',
  });

  const swapTo: Token = useWatch({
    control,
    name: 'swapTo',
  });

  return useGetSwapAMMPair(swapFrom.contractHash, swapTo.contractHash, options);
};
