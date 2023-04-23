import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { WalletDescriptor } from 'casper-storage';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { WalletAccount } from '@/typings/walletAccount';
import casperUserUtil from '@/utils/casper/casperUser';

export const useMutateAddAccount = (
  options?: UseMutationOptions<
    unknown,
    unknown,
    Partial<WalletAccount>,
    unknown
  >
) => {
  const queryClient = useQueryClient();
  return useMutation({
    ...options,
    mutationFn: async ({ name }: Partial<WalletAccount> = {}) => {
      const wallets = await casperUserUtil.getWallets();

      await casperUserUtil.addNewAccount({
        index: wallets.length,
        description: new WalletDescriptor(name),
      });

      await queryClient.invalidateQueries([QueryKeysEnum.ACCOUNTS]);
    },
    networkMode: 'offlineFirst',
  });
};
