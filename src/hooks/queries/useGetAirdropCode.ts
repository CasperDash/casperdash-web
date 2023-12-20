import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { useMutateCheckAirdropCode } from '../mutates/useMutateCheckAirdropCode';
import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { CheckAirdropCodeResponse } from '@/services/airdrop/user/type';
import { AirdropCodeStorage } from '@/utils/localForage/airdropCode';

type Result = CheckAirdropCodeResponse & {
  airdropCode: string;
};

export const useGetAirdropCode = (
  options?: Omit<
    UseQueryOptions<Result, unknown, Result, [QueryKeysEnum.AIRDROP_CODE]>,
    'queryKey' | 'queryFn'
  >
) => {
  const checkAirdropCodeMutation = useMutateCheckAirdropCode();

  return useQuery(
    [QueryKeysEnum.AIRDROP_CODE],
    async () => {
      const airdropCodeStorage = new AirdropCodeStorage();
      const airdropCode = await airdropCodeStorage.getCode();

      if (!airdropCode) {
        throw new Error('Airdrop code not found');
      }
      const { airdropStatus } = await checkAirdropCodeMutation.mutateAsync({
        airdropCode,
      });

      return {
        airdropCode,
        airdropStatus,
      };
    },
    {
      ...options,
      retry: false,
    }
  );
};
