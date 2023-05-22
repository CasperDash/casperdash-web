import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { getToken, GetTokenResponse } from '@/services/casperdash/token';

type UseGetTokenParams = {
  tokenAddress: string;
};

export const useGetToken = (
  { tokenAddress }: UseGetTokenParams,
  options?: Omit<
    UseQueryOptions<
      GetTokenResponse,
      unknown,
      GetTokenResponse,
      [QueryKeysEnum.TOKEN, string | undefined]
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery(
    [QueryKeysEnum.TOKEN, tokenAddress],
    () => getToken({ tokenAddress }),
    {
      ...options,
      enabled: !!tokenAddress,
    }
  );
};
