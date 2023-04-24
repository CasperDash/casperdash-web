import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import useDebounce from '../helpers/useDebounce';
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
  const tokenAddressDebounced = useDebounce<string>(tokenAddress, 300);
  return useQuery(
    [QueryKeysEnum.TOKEN, tokenAddressDebounced],
    () => getToken({ tokenAddress: tokenAddressDebounced }),
    {
      ...options,
      enabled: !!tokenAddressDebounced,
    }
  );
};
