import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import _get from 'lodash-es/get';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { getCoinPrice } from '@/services/coingecko/coin/prices';

type Data = {
  marketCap: number;
  price: number;
  priceChange: number;
  volume: number;
};

export const useGetCoinMarketData = (
  id?: string,
  options: Omit<
    UseQueryOptions<
      Data,
      unknown,
      Data,
      [QueryKeysEnum.COINGECKO_COIN_MARKET_DATA, string | undefined]
    >,
    'queryKey' | 'queryFn'
  > = {}
) => {
  return useQuery(
    [QueryKeysEnum.COINGECKO_COIN_MARKET_DATA, id],
    async (): Promise<Data> => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const result = await getCoinPrice({ id: id! });

      return {
        marketCap: _get(result, 'market_data.market_cap.usd', 0),
        price: _get(result, 'market_data.current_price.usd', 0),
        priceChange: _get(result, 'market_data.price_change_percentage_24h', 0),
        volume: _get(result, 'market_data.total_volume.usd', 0),
      };
    },
    {
      ...options,
      enabled: !!id,
    }
  );
};
