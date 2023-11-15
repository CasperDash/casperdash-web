import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { WalletInfo } from 'casper-storage';
import * as _ from 'lodash-es';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { WalletAccount } from '@/typings/walletAccount';
import casperUserUtil from '@/utils/casper/casperUser';

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

      return wallets.map((wallet: WalletInfo) => {
        return {
          name: _.get(wallet, 'descriptor.name', ''),
          uid: wallet?.uid,
          publicKey: _.get(wallet, 'publicKey', ''),
        };
      });
    },
    {
      ...options,
      networkMode: 'offlineFirst',
    }
  );
};
