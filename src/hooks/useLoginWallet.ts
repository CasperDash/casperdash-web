import { useCallback, useEffect } from 'react';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { useUpdateAccount } from './useUpdateAccount';
import { MutationKeysEnum } from '@/enums/mutationKeys.enum';
import casperUserUtil from '@/utils/casper/casperUser';

type LoginWalletResponse = {
  publicKey: string;
};

type LoginWalletParams = {
  password: string;
};

type MutateOption = UseMutationOptions<
  LoginWalletResponse,
  unknown,
  LoginWalletParams
>;

type Props = {
  onLocked?: () => void;
} & MutateOption;

export const useLoginWallet = ({ onLocked, ...options }: Props = {}) => {
  const { updateAccount } = useUpdateAccount();
  const { mutateAsync, mutate, isLoading, isSuccess } = useMutation<
    LoginWalletResponse,
    unknown,
    LoginWalletParams
  >({
    ...options,
    mutationKey: [MutationKeysEnum.LOGIN_WALLET],
    networkMode: 'offlineFirst',
    mutationFn: async ({ password }: LoginWalletParams) => {
      if (!password) {
        throw new Error('password_is_empty');
      }
      const result = await casperUserUtil.validateReturningUser({
        password,
      });
      if (!result) {
        throw new Error('can_not_validate_your_wallet');
      }
      const { publicKey, uid } = result;
      updateAccount({
        publicKey,
        uid,
      });

      return {
        publicKey,
      };
    },
  } as MutateOption);

  useEffect(() => {
    const isUserExisted = casperUserUtil.isUserExisted();

    if (!isUserExisted) {
      onLocked?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loginWalletAsync = useCallback(
    (password: string) => {
      return mutateAsync({ password });
    },
    [mutateAsync]
  );

  const loginWallet = useCallback(
    (password: string) => {
      return mutate({ password });
    },
    [mutate]
  );

  return {
    isLoading,
    isSuccess,
    loginWalletAsync,
    loginWallet,
  };
};
