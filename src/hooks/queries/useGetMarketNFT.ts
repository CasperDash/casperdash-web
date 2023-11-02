import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { getMarketNFT } from '@/services/casperdash/market/market.service';
import { IMarketNFT } from '@/services/casperdash/market/type';

type Params = {
  tokenAddress?: string;
  tokenId?: string;
};

export type UseGetMarketNFTOptions = UseQueryOptions<
  IMarketNFT,
  unknown,
  IMarketNFT,
  [string, string | undefined, string | undefined]
>;

export const useGetMarketNFT = (
  { tokenAddress, tokenId }: Params,
  options?: UseGetMarketNFTOptions
) => {
  return useQuery({
    ...options,
    queryKey: [QueryKeysEnum.MARKET_NFTS, tokenAddress, tokenId],
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    queryFn: () => getMarketNFT(tokenAddress!, tokenId!),
    enabled: !!tokenAddress && !!tokenId,
  });
};
