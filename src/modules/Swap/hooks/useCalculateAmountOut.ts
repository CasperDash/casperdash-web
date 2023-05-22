import { useCallback } from 'react';

import Big from 'big.js';
import { useFormContext } from 'react-hook-form';

import { useGetCurrentAMMPair } from './useGetCurrentAMMPair';
import { useSelectToken } from './useSelectToken';
import { getAmountOut } from '../utils';
import { PairData, PairRouteData } from '@/services/friendlyMarket/amm/type';

type CalculatePriceParams = {
  value: number;
  reverseIn: number | string;
  reverseOut: number | string;
  decimals: number;
};

const useCalculateAmountOut = () => {
  const { setValue } = useFormContext();
  const { data: pair = {} } = useGetCurrentAMMPair();
  const swapTo = useSelectToken('swapTo');
  const calculatePrice = useCallback(
    ({ value, reverseIn, reverseOut, decimals }: CalculatePriceParams) => {
      const amount = Big(getAmountOut(reverseIn, reverseOut, value))
        .round(decimals, 0)
        .toNumber();

      setValue('swapTo.amount', amount);
    },
    [setValue]
  );

  const handleChangeAmount = useCallback(
    (value: number) => {
      if (!value) {
        return;
      }
      const pairRouting = <PairRouteData>pair;
      if (pairRouting.isUsingRouting) {
        const bridgeAmount = getAmountOut(
          pairRouting.token0IntPair.reserve0,
          pairRouting.token0IntPair.reserve1,
          value
        );
        calculatePrice({
          value: bridgeAmount,
          reverseIn: pairRouting.intToken1Pair.reserve0,
          reverseOut: pairRouting.intToken1Pair.reserve1,
          decimals: swapTo.decimals,
        });
      } else if (pair && swapTo.contractHash) {
        calculatePrice({
          value,
          reverseIn: (<PairData>pair).reserve0,
          reverseOut: (<PairData>pair).reserve1,
          decimals: swapTo.decimals,
        });
      }
    },
    [calculatePrice, pair, swapTo.contractHash, swapTo.decimals]
  );

  return handleChangeAmount;
};

export default useCalculateAmountOut;
