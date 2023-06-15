import {
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';

import { useMutateCheckAirdropCode } from '../mutates/useMutateCheckAirdropCode';
import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { CheckAirdropCodeResponse } from '@/services/airdrop/user/type';

type Result = CheckAirdropCodeResponse & {
  airdropCode: string;
};

export const useGetAirdropCode = (
  options?: Omit<
    UseQueryOptions<Result, unknown, Result, [QueryKeysEnum.AIRDROP_CODE]>,
    'queryKey' | 'queryFn'
  >
) => {
  const queryClient = useQueryClient();
  const checkAirdropCodeMutation = useMutateCheckAirdropCode();

  return useQuery(
    [QueryKeysEnum.AIRDROP_CODE],
    async () => {
      const { airdropCode } =
        queryClient.getQueryData<Result>([QueryKeysEnum.AIRDROP_CODE]) || {};
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
