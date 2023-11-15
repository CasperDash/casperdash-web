import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import {
  CheckAirdropCodeParams,
  CheckAirdropCodeResponse,
} from '@/services/airdrop/user/type';
import { checkAirdropCode } from '@/services/airdrop/user/user.service';

export const useMutateCheckAirdropCode = (
  options?: UseMutationOptions<
    CheckAirdropCodeResponse,
    AxiosError,
    CheckAirdropCodeParams,
    unknown
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: checkAirdropCode,
    networkMode: 'offlineFirst',
    onSuccess: async (data, variables, context) => {
      queryClient.setQueryData([QueryKeysEnum.AIRDROP_CODE], {
        airdropCode: variables.airdropCode,
      });

      options?.onSuccess?.(data, variables, context);
    },
  });
};
