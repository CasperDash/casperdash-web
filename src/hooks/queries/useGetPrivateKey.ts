import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import casperUserUtil from '@/utils/casper/casperUser';

type UserGetPrivateKeyParams = {
  uid?: string;
};

export const useGetPrivateKey = (
  { uid }: UserGetPrivateKeyParams,
  options?: Omit<
    UseQueryOptions<
      string,
      unknown,
      string,
      [QueryKeysEnum.PRIVATE_KEY_WITH_UID, string | undefined]
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery(
    [QueryKeysEnum.PRIVATE_KEY_WITH_UID, uid],
    async () => {
      if (!uid) {
        throw new Error('uid_is_empty');
      }

      const privateKey = await casperUserUtil.getPrivateKeyByUID({ uid });
      if (!privateKey) {
        throw new Error('private_key_not_found');
      }

      return privateKey;
    },
    {
      ...options,
      enabled: !!uid,
    }
  );
};
