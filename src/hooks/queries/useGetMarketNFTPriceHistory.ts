import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { getMarketNFTPriceHistory } from '@/services/casperdash/market/market.service';
import { IPriceHistory } from '@/services/casperdash/market/type';

type Params = {
  tokenPackageHash?: string;
  tokenId?: string;
};

export type UseGetMarketNFTOptions = UseQueryOptions<
  IPriceHistory[],
  unknown,
  IPriceHistory[],
  [string, string | undefined, string | undefined, string]
>;

export const useGetMarketNFTPriceHistory = (
  { tokenPackageHash, tokenId }: Params,
  options?: UseGetMarketNFTOptions
) => {
  return useQuery({
    ...options,
    queryKey: [
      QueryKeysEnum.MARKET_NFTS,
      tokenPackageHash,
      tokenId,
      'priceHistory',
    ],
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    queryFn: () => getMarketNFTPriceHistory(tokenPackageHash!, tokenId!),
    enabled: !!tokenPackageHash && !!tokenId,
  });
};
