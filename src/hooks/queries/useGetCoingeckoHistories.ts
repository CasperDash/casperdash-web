import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { getCoinHistories } from '@/services/coingecko/coin/coin.service';
import { CoingeckoHistory } from '@/services/coingecko/coin/type';

export const useGetCoingeckoHistories = (
  options?: Omit<
    UseQueryOptions<unknown, unknown, CoingeckoHistory[], [QueryKeysEnum]>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery([QueryKeysEnum.COINGECKO_COIN_HISTORIES], getCoinHistories, {
    ...options,
  });
};
