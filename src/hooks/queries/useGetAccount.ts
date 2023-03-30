import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { getAccounts } from '@/services/casperdash/user';
import { WalletAccount } from '@/typings/walletAccount';
import { normalizeAccount } from '@/utils/normalizer';

type UseGetAccountParams = {
  publicKey?: string;
};

export const useGetAccount = (
  { publicKey }: UseGetAccountParams,
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
  return useQuery(
    [QueryKeysEnum.ACCOUNT, publicKey],
    async () => {
      const accounts = await getAccounts({
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        publicKeys: [publicKey!],
      });
      if (!accounts || accounts.length === 0) {
        throw new Error('Can not get account');
      }

      const [account] = accounts;

      return normalizeAccount(account);
    },
    {
      ...options,
      enabled: !!publicKey,
    }
  );
};
