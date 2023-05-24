import { useCallback } from 'react';

import Big from 'big.js';
import { useFormContext } from 'react-hook-form';

import { useGetCurrentAMMPair } from './useGetCurrentAMMPair';
import { useSelectToken } from './useSelectToken';
import {
  findReverseRouteIntToken1PairByContractHash,
  findReverseRouteToken0IntPairByContractHash,
  getAmountOut,
} from '../utils';
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
  const swapFrom = useSelectToken('swapFrom');
  const swapTo = useSelectToken('swapTo');
  const calculatePrice = ({
    value,
    reverseIn,
    reverseOut,
    decimals,
  }: CalculatePriceParams) => {
    const amount = Big(getAmountOut(reverseIn, reverseOut, value))
      .round(decimals, 0)
      .toNumber();

    setValue('swapTo.amount', amount);
  };

  const handleChangeAmount = useCallback(
    (value: number) => {
      if (!value) {
        setValue('swapTo.amount', 0);
        return;
      }
      const pairRouting = <PairRouteData>pair;

      if (pairRouting.isUsingRouting) {
        const [reserve0, reserve1] =
          findReverseRouteToken0IntPairByContractHash(
            swapFrom.contractHash,
            pairRouting
          );
        const bridgeAmount = getAmountOut(reserve0, reserve1, value);
        const [reserve0IntPair, reserve1IntPair] =
          findReverseRouteIntToken1PairByContractHash(
            swapTo.contractHash,
            pairRouting
          );

        calculatePrice({
          value: bridgeAmount,
          reverseIn: reserve0IntPair,
          reverseOut: reserve1IntPair,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pair, swapTo.contractHash, swapTo.decimals]
  );

  return handleChangeAmount;
};

export default useCalculateAmountOut;
