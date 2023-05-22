import { useFormContext, useWatch } from 'react-hook-form';

import { SwapName } from '../type';
import { useGetCoinMarketData } from '@/hooks/queries/useGetCoinMarketData';

export const useSelectToken = (name: SwapName) => {
  const { control } = useFormContext();
  const valueWatched = useWatch({
    control,
    name: name,
  });
  const { data = { price: 0, amount: 0 } } = useGetCoinMarketData(
    valueWatched?.coingeckoId
  );

  return {
    ...valueWatched,
    price: data.price,
  };
};
