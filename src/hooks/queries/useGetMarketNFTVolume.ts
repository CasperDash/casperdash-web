import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { getMarketNFTVolume } from '@/services/casperdash/market/market.service';

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

export const useGetMarketNFTVolume = (
  { tokenPackageHash, tokenId }: Params,
  options?: UseGetMarketNFTOptions
) => {
  return useQuery({
    ...options,
    queryKey: [QueryKeysEnum.MARKET_NFTS, tokenPackageHash, tokenId, 'volume'],
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    queryFn: () => getMarketNFTVolume(tokenPackageHash!, tokenId!),
    enabled: !!tokenPackageHash && !!tokenId,
  });
};
