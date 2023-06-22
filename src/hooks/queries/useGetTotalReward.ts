/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { getTotalReward } from '@/services/cspr/delegator/delegator.service';
import { toCSPR } from '@/utils/currency';

export const useGetTotalRewards = (
  publicKey?: string,
  options?: Omit<
    UseQueryOptions<
      number,
      unknown,
      number,
      [QueryKeysEnum.ACCOUNT_TOTAL_REWARDS, string | undefined]
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery(
    [QueryKeysEnum.ACCOUNT_TOTAL_REWARDS, publicKey],
    async () => {
      const totalRewards = await getTotalReward(publicKey!);

      return toCSPR(totalRewards);
    },
    {
      ...options,
      enabled: !!publicKey,
    }
  );
};
