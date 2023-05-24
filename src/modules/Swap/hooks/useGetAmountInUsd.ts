import Big from 'big.js';

import { useGetCoinMarketData } from '@/hooks/queries/useGetCoinMarketData';
import { Token } from '@/services/friendlyMarket/tokens';

type GetAmountInUsdParams = {
  token?: Token;
};

export const useGetAmountInUsd = ({ token }: GetAmountInUsdParams) => {
  const { data = { price: 0, amount: 0 } } = useGetCoinMarketData(
    token?.coingeckoId
  );
  const amountInUsd = Big(data.price || 0)
    .times(token?.amount || 0)
    .round(8)
    .toNumber();

  return amountInUsd;
};
