import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { getMarketNFTs } from '@/services/casperdash/market/nft.service';
import { IMarketNFT } from '@/services/casperdash/market/type';

export const useGetMarketNFTs = (
  options?: UseQueryOptions<IMarketNFT[], unknown, IMarketNFT[], [string]>
) => {
  return useQuery({
    ...options,
    queryKey: ['marketNFT'],
    queryFn: async () => {
      const data = await getMarketNFTs();

      return data.docs;
    },
  });
};
