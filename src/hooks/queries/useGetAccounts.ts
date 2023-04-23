import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import * as _ from 'lodash-es';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { getAccounts } from '@/services/casperdash/user';
import { WalletAccount } from '@/typings/walletAccount';
import casperUserUtil from '@/utils/casper/casperUser';
import { normalizeAccount } from '@/utils/normalizer';

export const useGetAccounts = (
  options?: Omit<
    UseQueryOptions<
      unknown,
      unknown,
      WalletAccount[],
      [QueryKeysEnum.ACCOUNTS]
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery(
    [QueryKeysEnum.ACCOUNTS],
    async () => {
      const wallets = await casperUserUtil.getWallets();
      const publicKeys = wallets
        .map((wallet) => _.get(wallet, 'publicKey', ''))
        .filter((publicKey) => !!publicKey);

      const accounts = await getAccounts({
        publicKeys,
      });
      if (!accounts || accounts.length === 0) {
        return [];
      }

      return accounts.map((account) => {
        const foundWallet = wallets.find(
          (wallet) => _.get(wallet, 'publicKey') === account.publicKey
        );
        return {
          ...normalizeAccount(account),
          name: _.get(foundWallet, 'descriptor.name', ''),
          uid: foundWallet?.uid,
        };
      });
    },
    {
      ...options,
      networkMode: 'offlineFirst',
    }
  );
};
