import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { WalletInfo } from 'casper-storage';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import casperUserUtil from '@/utils/casper/casperUser';

type MutateVariables = {
  name: string;
  privateKey: string;
};

export const useMutateAddLeagcyAccount = (
  options?: UseMutationOptions<WalletInfo, unknown, MutateVariables, unknown>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    ...options,
    mutationFn: async ({ name, privateKey }: MutateVariables) => {
      const account = await casperUserUtil.addLegacyAccount({
        name,
        privateKey,
      });

      await queryClient.invalidateQueries([QueryKeysEnum.ACCOUNTS]);

      return account;
    },
    networkMode: 'offlineFirst',
  });
};
