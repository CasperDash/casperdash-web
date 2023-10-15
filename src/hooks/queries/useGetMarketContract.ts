import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { getMarketContractInfo } from '@/services/casperdash/market/nft.service';
import { IMarketContract } from '@/services/casperdash/market/type';

type UseGetTokenParams = {
  tokenAddress?: string;
};

export type UseGetMarketContractOptions = UseQueryOptions<
  IMarketContract,
  unknown,
  IMarketContract,
  [string, string | undefined]
>;

export const useGetMarketContract = (
  { tokenAddress }: UseGetTokenParams,
  options?: UseGetMarketContractOptions
) => {
  return useQuery({
    ...options,
    queryKey: [QueryKeysEnum.MARKET_NFTS, tokenAddress],
    enabled: !!tokenAddress,
    queryFn: () => getMarketContractInfo(tokenAddress!),
  });
};
