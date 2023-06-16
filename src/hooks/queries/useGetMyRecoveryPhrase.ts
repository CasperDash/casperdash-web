import { useEffect } from 'react';

import {
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';

import { useAccount } from '../useAccount';
import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import casperUserUtil from '@/utils/casper/casperUser';

export const useGetMyRecoveryPhrase = (
  options?: Omit<
    UseQueryOptions<
      string,
      unknown,
      string,
      [QueryKeysEnum.RECOVERY_PHRASE, string | undefined]
    >,
    'queryKey' | 'queryFn'
  >
) => {
  const { publicKey } = useAccount();
  const queryClient = useQueryClient();

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries([QueryKeysEnum.RECOVERY_PHRASE, publicKey]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useQuery(
    [QueryKeysEnum.RECOVERY_PHRASE, publicKey],
    async () => {
      const keyPhrase = await casperUserUtil.getKeyphrase();

      return keyPhrase;
    },
    {
      ...options,
      enabled: !!publicKey,
    }
  );
};
