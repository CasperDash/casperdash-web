import { useMemo } from 'react';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import {
  getCSPRMarketInfo,
  getCSPRPriceHistories,
} from '@/services/casperdash/price/price.service';
import { ILatestPrice } from '@/services/casperdash/price/type';

export const useGetCSPRMarketInfo = (
  options?: Omit<
    UseQueryOptions<unknown, unknown, ILatestPrice, [QueryKeysEnum.CSPR_PRICE]>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery([QueryKeysEnum.CSPR_PRICE], getCSPRMarketInfo, {
    ...options,
  });
};

export const usePriceHistories = (
  options?: Omit<
    UseQueryOptions<
      unknown,
      unknown,
      number[][],
      [QueryKeysEnum.PRICE_HISTORIES]
    >,
    'queryKey' | 'queryFn'
  >
) => {
  const query = useQuery(
    [QueryKeysEnum.PRICE_HISTORIES],
    getCSPRPriceHistories,
    {
      ...options,
    }
  );
  const data = useMemo(
    () =>
      query.data?.map((datum) => ({ timestamp: datum[0], value: datum[1] })),
    [query.data]
  );
  return { ...query, data };
};
