import { UseQueryOptions } from '@tanstack/react-query';

import { useGetAccountBalance } from './useGetAccountBalance';
import { useAccount } from '../useAccount';
import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { WalletAccountBalance } from '@/typings/walletAccount';

export const useGetCurrentBalance = (
  options?: Omit<
    UseQueryOptions<
      WalletAccountBalance,
      unknown,
      WalletAccountBalance,
      [QueryKeysEnum.ACCOUNT_BALANCES, string | undefined]
    >,
    'queryKey' | 'queryFn'
  >
) => {
  const { publicKey } = useAccount();

  return useGetAccountBalance(
    {
      publicKey,
    },
    options
  );
};
