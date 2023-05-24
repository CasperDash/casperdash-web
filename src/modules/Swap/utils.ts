import Big from 'big.js';

import { PairRouteData } from '@/services/friendlyMarket/amm/type';

export const getAmountIn = (
  reserveIn: number | string,
  reserveOut: number | string,
  amountOut: number
) => {
  if (!amountOut) {
    return 0;
  }
  if (!reserveIn || !reserveOut) {
    return 0;
  }
  const numerator = Big(reserveIn).times(amountOut).times(1000);
  const denominator = Big(reserveOut).minus(amountOut).times(997);

  return numerator.div(Big(denominator).add(1)).toNumber();
};

export const getAmountOut = (
  reserveIn: number | string,
  reserveOut: number | string,
  amountIn: number
) => {
  if (!amountIn) {
    return 0;
  }
  if (!reserveIn || !reserveOut) {
    return 0;
  }

  const amountInWithFee = Big(amountIn).times(997);
  const numerator = Big(amountInWithFee).times(reserveOut);
  const denominator = Big(reserveIn).times(1000).add(amountInWithFee);

  return numerator.div(denominator).toNumber();
};

export const calculateAmountOutMin = (
  amountOut: number,
  slippage: number,
  decimals: number
) => {
  return Big(amountOut || 0)
    .times(1 - slippage / 100)
    .round(decimals, 0)
    .toNumber();
};

export const findReverseRouteIntToken1PairByContractHash = (
  contractHash: string,
  pairRouteData: PairRouteData
) => {
  const { intToken1Pair } = pairRouteData;
  if (intToken1Pair.token0 === contractHash) {
    return [intToken1Pair.reserve1, intToken1Pair.reserve0];
  }

  if (intToken1Pair.token1 === contractHash) {
    return [intToken1Pair.reserve0, intToken1Pair.reserve1];
  }

  return [0, 0];
};

export const findReverseRouteToken0IntPairByContractHash = (
  contractHash: string,
  pairRouteData: PairRouteData
) => {
  const { token0IntPair } = pairRouteData;
  if (token0IntPair.token0 === contractHash) {
    return [token0IntPair.reserve0, token0IntPair.reserve1];
  }

  if (token0IntPair.token1 === contractHash) {
    return [token0IntPair.reserve1, token0IntPair.reserve0];
  }

  return [0, 0];
};
