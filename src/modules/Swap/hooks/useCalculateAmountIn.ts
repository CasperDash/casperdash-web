import { useCallback } from 'react';

import Big from 'big.js';
import { useFormContext } from 'react-hook-form';

import { useGetCurrentAMMPair } from './useGetCurrentAMMPair';
import { useSelectToken } from './useSelectToken';
import { getAmountIn } from '../utils';
import { PairData, PairRouteData } from '@/services/friendlyMarket/amm/type';

type CalculatePriceParams = {
  value: number;
  reverseIn: number | string;
  reverseOut: number | string;
  decimals: number;
};

const useCalculateAmountIn = () => {
  const { setValue } = useFormContext();
  const { data: pair = {} } = useGetCurrentAMMPair();
  const swapFrom = useSelectToken('swapFrom');
  const calculatePrice = useCallback(
    ({ value, reverseIn, reverseOut, decimals }: CalculatePriceParams) => {
      const amount = Big(getAmountIn(reverseIn, reverseOut, value))
        .round(decimals, 0)
        .toNumber();

      setValue('swapFrom.amount', amount);
    },
    [setValue]
  );

  const handleChangeAmount = useCallback(
    (value: number) => {
      if (!value) {
        setValue('swapFrom.amount', 0);
        return;
      }
      const pairRouting = <PairRouteData>pair;
      if (pairRouting.isUsingRouting) {
        const bridgeAmount = getAmountIn(
          pairRouting.intToken1Pair.reserve0,
          pairRouting.intToken1Pair.reserve1,
          value
        );
        calculatePrice({
          value: bridgeAmount,
          reverseIn: pairRouting.token0IntPair.reserve0,
          reverseOut: pairRouting.token0IntPair.reserve1,
          decimals: swapFrom.decimals,
        });
      } else if (pair && swapFrom.contractHash) {
        calculatePrice({
          value,
          reverseIn: (<PairData>pair).reserve0,
          reverseOut: (<PairData>pair).reserve1,
          decimals: swapFrom.decimals,
        });
      }
    },
    [calculatePrice, pair, swapFrom.contractHash, swapFrom.decimals]
  );

  return handleChangeAmount;
};

export default useCalculateAmountIn;
