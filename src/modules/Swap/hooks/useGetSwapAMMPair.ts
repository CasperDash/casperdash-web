import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import _isArray from 'lodash-es/isArray';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { getPair } from '@/services/friendlyMarket/amm';
import { PairData, PairRouteData } from '@/services/friendlyMarket/amm/type';

type Data = PairData | PairRouteData | undefined;

export type UseGetSwapAMMPairData = UseQueryResult<Data, unknown>;

export type UseGetSwapAMMPairOption = Omit<
  UseQueryOptions<
    Data,
    unknown,
    Data,
    [QueryKeysEnum.SWAP_AMM_PAIR, string | undefined, string | undefined]
  >,
  'queryKey' | 'queryFn'
>;

export const useGetSwapAMMPair = (
  fromContractHash: string,
  toContractHash: string,
  options: UseGetSwapAMMPairOption = {}
): UseGetSwapAMMPairData => {
  return useQuery(
    [QueryKeysEnum.SWAP_AMM_PAIR, fromContractHash, toContractHash],
    async () => {
      const data = await getPair({ fromContractHash, toContractHash });

      const pairRouteData = <PairRouteData>data;
      if (
        pairRouteData.path &&
        _isArray(pairRouteData.path) &&
        pairRouteData.path.length > 0
      ) {
        return {
          ...pairRouteData,
          isUsingRouting: true,
        };
      }

      return <PairData>data;
    },
    {
      ...options,
      enabled: !!fromContractHash && !!toContractHash,
    }
  );
};
