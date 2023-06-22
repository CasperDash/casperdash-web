import { useMemo } from 'react';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import Big from 'big.js';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { getAccountDelegation } from '@/services/casperdash/staking/staking.service';
import { IAccountDelegationResponse } from '@/services/casperdash/staking/type';
import { toCSPR } from '@/utils/currency';

export const useGetDelegation = (
  publicKey?: string,
  options?: Omit<
    UseQueryOptions<
      IAccountDelegationResponse[],
      unknown,
      IAccountDelegationResponse[],
      [QueryKeysEnum.ACCOUNT_DELEGATION, string | undefined]
    >,
    'queryKey' | 'queryFn'
  >
) => {
  const query = useQuery([QueryKeysEnum.ACCOUNT_DELEGATION, publicKey], {
    queryFn: () => getAccountDelegation(publicKey),
    enabled: !!publicKey,
    ...options,
  });

  const totalStaked = useMemo(() => {
    return toCSPR(
      query.data
        ?.reduce<Big>((out, item) => {
          return out.add(item.stakedAmount);
        }, Big(0))
        .toNumber() || 0
    );
  }, [query.data]);

  return { ...query, totalStaked };
};
