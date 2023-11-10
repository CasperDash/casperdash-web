import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { WalletAccount } from '@/typings/walletAccount';
import casperUserUtil from '@/utils/casper/casperUser';
import { AccountStorage } from '@/utils/localForage/account';

type UseGetAccountParams = {
  publicKey?: string;
  uid?: string;
};

export const useGetAccount = (
  { publicKey, uid }: UseGetAccountParams,
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
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const accountStorage = new AccountStorage(publicKey!);

      try {
        const walletDetails = await casperUserUtil.getCurrentWalletDetails();

        await accountStorage.setItem({
          name: walletDetails?.descriptor.name,
          uid: uid!,
        });

        return {
          publicKey,
          name: walletDetails?.descriptor.name,
          uid,
        };
      } catch (error) {
        const walletCached = await accountStorage.getItem<WalletAccount>();

        return {
          publicKey,
          name: walletCached?.name,
          uid,
        };
      }
    },
    {
      ...options,
      networkMode: 'offlineFirst',
      enabled: !!publicKey,
    }
  );
};
