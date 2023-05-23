import { useFormContext, useWatch } from 'react-hook-form';

import { useGetSwapTokenBalance } from './useGetSwapTokenBalance';
import { SwapName } from '../type';
import { useGetCoinMarketData } from '@/hooks/queries/useGetCoinMarketData';
import { useAccount } from '@/hooks/useAccount';

export const useSelectToken = (name: SwapName) => {
  const { publicKey } = useAccount();
  const { control } = useFormContext();
  const valueWatched = useWatch({
    control,
    name: name,
  });
  const { data: value = { price: 0, amount: 0 } } = useGetCoinMarketData(
    valueWatched?.coingeckoId
  );

  const { data: { balance = 0 } = { balance: 0 } } = useGetSwapTokenBalance({
    ...valueWatched,
    publicKey,
  });

  return {
    ...valueWatched,
    price: value.price,
    balance,
  };
};
