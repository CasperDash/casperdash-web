import { useCallback, useEffect } from 'react';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { useI18nToast } from './useI18nToast';
import { MutationKeysEnum } from '@/enums/mutationKeys.enum';
import { useAppDispatch } from '@/store';
import { updatePublicKey } from '@/store/wallet';
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
  const dispatch = useAppDispatch();
  const { toastError } = useI18nToast();
  const { mutateAsync, isLoading, isSuccess } = useMutation<
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
        toastError('can_not_validate_your_wallet');

        return;
      }
      const { publicKey } = result;
      dispatch(updatePublicKey(publicKey));

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

  const loginWallet = useCallback(
    (password: string) => {
      return mutateAsync({ password });
    },
    [mutateAsync]
  );

  return {
    isLoading,
    isSuccess,
    loginWallet,
  };
};
