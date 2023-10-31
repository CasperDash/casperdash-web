import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { getMarketNFT } from '@/services/casperdash/market/nft.service';
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
    queryKey: ['marketNFT', tokenAddress, tokenId],
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    queryFn: () => getMarketNFT(tokenAddress!, tokenId!),
    enabled: !!tokenAddress && !!tokenId,
  });
};
