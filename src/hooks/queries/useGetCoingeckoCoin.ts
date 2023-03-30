import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { getCoin } from '@/services/coingecko/coin/coin.service';
import { CoingeckoCoin } from '@/services/coingecko/coin/type';

export const useGetCoingeckoCoin = (
  options?: Omit<
    UseQueryOptions<
      unknown,
      unknown,
      CoingeckoCoin,
      [QueryKeysEnum.COINGECKO_COIN]
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery([QueryKeysEnum.COINGECKO_COIN], getCoin, {
    ...options,
  });
};
