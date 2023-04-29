import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import casperUserUtil from '@/utils/casper/casperUser';

export const useMutateLockWallet = (
  options?: UseMutationOptions<unknown, unknown, void, unknown>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    ...options,
    mutationFn: async () => {
      casperUserUtil.lockWallet();
      await queryClient.invalidateQueries([QueryKeysEnum.ACCOUNT]);
      queryClient.setQueryData([QueryKeysEnum.LOCKED], true);
    },
    networkMode: 'offlineFirst',
  });
};
