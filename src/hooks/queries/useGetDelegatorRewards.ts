import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { getDelegatorRewards } from '@/services/cspr/delegator/delegator.service';
import {
  GetDelegatorRewardsParams,
  GetDelegatorRewardsResponse,
} from '@/services/cspr/delegator/type';

type Params = Partial<GetDelegatorRewardsParams>;

export const useGetDelegatorRewards = (
  { page = 1, limit = 1000, publicKey }: Params,
  options?: Omit<
    UseQueryOptions<
      GetDelegatorRewardsResponse,
      unknown,
      GetDelegatorRewardsResponse,
      [
        QueryKeysEnum.ACCOUNT_DELEGATOR_REWARDS,
        string | undefined,
        {
          page: number;
          limit: number;
        }
      ]
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery(
    [
      QueryKeysEnum.ACCOUNT_DELEGATOR_REWARDS,
      publicKey,
      {
        page,
        limit,
      },
    ],
    {
      queryFn: async () => {
        return getDelegatorRewards({
          page,
          limit,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          publicKey: publicKey!,
        });
      },
      enabled: !!publicKey,
      ...options,
    }
  );
};
