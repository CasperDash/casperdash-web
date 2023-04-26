import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { getAccounts } from '@/services/casperdash/user';
import { WalletAccountBalance } from '@/typings/walletAccount';
import { normalizeAccountBalance } from '@/utils/normalizer';

type UseGetBalanceParams = {
  publicKey?: string;
};

export const useGetAccountBalance = (
  { publicKey }: UseGetBalanceParams,
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
  return useQuery(
    [QueryKeysEnum.ACCOUNT_BALANCES, publicKey],
    async () => {
      const accounts = await getAccounts({
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        publicKeys: [publicKey!],
      });
      if (!accounts || accounts.length === 0) {
        throw new Error('Can not get account');
      }

      const [account] = accounts;

      return normalizeAccountBalance(account);
    },
    {
      ...options,
      enabled: !!publicKey,
    }
  );
};
