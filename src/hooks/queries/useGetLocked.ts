import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import casperUserUtil from '@/utils/casper/casperUser';

export const useGetLocked = (
  options?: Omit<
    UseQueryOptions<unknown, unknown, boolean, [QueryKeysEnum.LOCKED]>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery([QueryKeysEnum.LOCKED], {
    ...options,
    queryFn: async () => {
      const publicKeyActive = casperUserUtil.getCachedPublicKey();
      const loginOptions = casperUserUtil.getCachedLoginOptions();

      return Boolean(!publicKeyActive && loginOptions);
    },
    networkMode: 'offlineFirst',
  });
};
