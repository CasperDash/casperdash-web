import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { getMarketContractByPackageHash } from '@/services/casperdash/market/market.service';
import { ITokenContract } from '@/services/casperdash/market/type';

export type Options = UseQueryOptions<
  ITokenContract,
  unknown,
  ITokenContract,
  [QueryKeysEnum.MARKET_CONTRACTS, Params | undefined]
>;

type Params = {
  packageHash?: string;
};

export const useGetMarketContractByPackageHash = (
  params?: Params,
  options?: Omit<Options, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    ...options,
    queryKey: [QueryKeysEnum.MARKET_CONTRACTS, params],
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    queryFn: () => getMarketContractByPackageHash(params!.packageHash!),
    enabled: !!params?.packageHash,
  });
};
