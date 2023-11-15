import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { getMarketNFTs } from '@/services/casperdash/market/market.service';
import { IMarketNFT } from '@/services/casperdash/market/type';

export const useGetMarketNFTs = (
  options?: UseQueryOptions<IMarketNFT[], unknown, IMarketNFT[], [string]>
) => {
  return useQuery({
    ...options,
    queryKey: [QueryKeysEnum.MARKET_NFTS],
    queryFn: async () => {
      const data = await getMarketNFTs();

      return data.docs;
    },
  });
};
