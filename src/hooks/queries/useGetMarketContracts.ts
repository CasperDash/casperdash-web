import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { getMarketContracts } from '@/services/casperdash/market/market.service';
import {
  IGetMarketContractsParams,
  ITokenContract,
  ListResponse,
} from '@/services/casperdash/market/type';

export type UseGetMarketContractsOptions = UseQueryOptions<
  ListResponse<ITokenContract>,
  unknown,
  ListResponse<ITokenContract>,
  [QueryKeysEnum.MARKET_CONTRACTS, IGetMarketContractsParams | undefined]
>;

export const useGetMarketContracts = (
  params?: IGetMarketContractsParams,
  options?: Omit<UseGetMarketContractsOptions, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    ...options,
    queryKey: [QueryKeysEnum.MARKET_CONTRACTS, params],
    queryFn: () => getMarketContracts(params),
  });
};
