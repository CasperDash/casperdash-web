import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { getMarketNFT } from '@/services/casperdash/market/market.service';
import { IMarketNFT } from '@/services/casperdash/market/type';

type Params = {
  tokenPackageHash?: string;
  tokenId?: string;
};

export type UseGetMarketNFTOptions = UseQueryOptions<
  IMarketNFT,
  unknown,
  IMarketNFT,
  [string, string | undefined, string | undefined]
>;

export const useGetMarketNFT = (
  { tokenPackageHash, tokenId }: Params,
  options?: UseGetMarketNFTOptions
) => {
  return useQuery({
    ...options,
    queryKey: [QueryKeysEnum.MARKET_NFTS, tokenPackageHash, tokenId],
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    queryFn: () => getMarketNFT(tokenPackageHash!, tokenId!),
    enabled: !!tokenPackageHash && !!tokenId,
  });
};
