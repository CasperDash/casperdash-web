import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { SubmitAirdropParams } from '@/services/airdrop/user/type';
import { submitAirdrop } from '@/services/airdrop/user/user.service';

export const useMutateSubmitAirdropCode = (
  options?: UseMutationOptions<unknown, unknown, SubmitAirdropParams, unknown>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: submitAirdrop,
    networkMode: 'offlineFirst',
    onSuccess: async (data, variables, context) => {
      queryClient.refetchQueries([QueryKeysEnum.AIRDROP_CODE]);

      options?.onSuccess?.(data, variables, context);
    },
  });
};
