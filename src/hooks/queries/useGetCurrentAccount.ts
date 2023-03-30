import { UseQueryOptions } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

import { useGetAccount } from './useGetAccount';
import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { publicKeySelector } from '@/store/wallet';
import { WalletAccount } from '@/typings/walletAccount';

export const useGetCurrentAccount = (
  options?: Omit<
    UseQueryOptions<
      unknown,
      unknown,
      WalletAccount,
      [QueryKeysEnum.ACCOUNT, string | undefined]
    >,
    'queryKey' | 'queryFn'
  >
) => {
  const publicKey = useSelector(publicKeySelector);
  return useGetAccount(
    {
      publicKey,
    },
    options
  );
};
