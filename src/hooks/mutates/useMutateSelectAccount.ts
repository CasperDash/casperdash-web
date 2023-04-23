import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { MutationKeysEnum } from '@/enums/mutationKeys.enum';
import { useAppDispatch } from '@/store';
import { updatePublicKey } from '@/store/wallet';
import { WalletAccount } from '@/typings/walletAccount';
import casperUserUtil from '@/utils/casper/casperUser';

type MutateVariables = {
  account: WalletAccount;
};

type Options = UseMutationOptions<WalletAccount, unknown, MutateVariables>;

export const useMutateSelectAccount = (options: Options = {}) => {
  const dispatch = useAppDispatch();

  return useMutation<WalletAccount, unknown, MutateVariables>({
    ...options,
    mutationFn: async ({ account }: MutateVariables) => {
      if (!account.uid) {
        throw new Error('wallet_uid_not_found');
      }
      const publicKey = await casperUserUtil.setSelectedWallet(account.uid);
      if (!publicKey) {
        throw new Error('public_key_not_found');
      }

      dispatch(updatePublicKey(publicKey));

      return account;
    },
    mutationKey: [MutationKeysEnum.SELECT_ACCOUNT],
    networkMode: 'offlineFirst',
  });
};
