import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { Account, getAccounts } from '@/services/casperdash/user';
import { WalletAccountBalance } from '@/typings/walletAccount';
import { normalizeAccountBalance } from '@/utils/normalizer';

type UseGetBalanceParams = {
  publicKeys: string[];
};

export const useGetAccountBalances = (
  { publicKeys }: UseGetBalanceParams,
  options?: Omit<
    UseQueryOptions<
      WalletAccountBalance[],
      unknown,
      WalletAccountBalance[],
      [QueryKeysEnum.ACCOUNT_BALANCES]
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery(
    [QueryKeysEnum.ACCOUNT_BALANCES],
    async () => {
      const accounts = await getAccounts({
        publicKeys: publicKeys,
      });
      if (!accounts || accounts.length === 0) {
        throw new Error('Can not get account');
      }

      return accounts.map((account: Account) =>
        normalizeAccountBalance(account)
      );
    },
    {
      ...options,
      enabled: publicKeys.length > 0,
    }
  );
};
