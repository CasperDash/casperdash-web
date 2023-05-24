import Big from 'big.js';

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
