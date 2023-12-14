import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { getMarketNFTFloorPrice } from '@/services/casperdash/market/market.service';

type Params = {
  tokenPackageHash?: string;
  tokenId?: string;
};

export type UseGetMarketNFTOptions = UseQueryOptions<
  number,
  unknown,
  number,
  [string, string | undefined, string | undefined, string]
>;

export const useGetMarketNFTFloorPrice = (
  { tokenPackageHash, tokenId }: Params,
  options?: UseGetMarketNFTOptions
) => {
  return useQuery({
    ...options,
    queryKey: [
      QueryKeysEnum.MARKET_NFTS,
      tokenPackageHash,
      tokenId,
      'floorPrice',
    ],
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    queryFn: () => getMarketNFTFloorPrice(tokenPackageHash!, tokenId!),
    enabled: !!tokenPackageHash && !!tokenId,
  });
};
