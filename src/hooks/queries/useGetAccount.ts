import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { WalletAccount } from '@/typings/walletAccount';
import casperUserUtil from '@/utils/casper/casperUser';

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
      const walletDetails = await casperUserUtil.getCurrentWalletDetails();

      return {
        publicKey,
        name: walletDetails?.descriptor.name,
        uid,
      };
    },
    {
      ...options,
      enabled: !!publicKey,
    }
  );
};
