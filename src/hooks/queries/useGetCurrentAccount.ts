import { UseQueryOptions } from '@tanstack/react-query';

import { useGetAccount } from './useGetAccount';
import { useAccount } from '../useAccount';
import { QueryKeysEnum } from '@/enums/queryKeys.enum';
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
  const { publicKey } = useAccount();
  return useGetAccount(
    {
      publicKey,
    },
    options
  );
};
