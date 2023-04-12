import {
  UseQueryOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useSelector } from 'react-redux';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { publicKeySelector } from '@/store/wallet';

export const useGetConnectedUrls = (
  options?: Omit<
    UseQueryOptions<
      unknown,
      unknown,
      string[],
      [QueryKeysEnum.CONNECTED_URLS, string | undefined]
    >,
    'queryKey' | 'queryFn'
  >
) => {
  const publicKey = useSelector(publicKeySelector);
  const queryClient = useQueryClient();

  return useQuery(
    [QueryKeysEnum.CONNECTED_URLS, publicKey],
    async () => {
      const connectedUrls =
        queryClient.getQueryData<string[]>([
          QueryKeysEnum.CONNECTED_URLS,
          publicKey,
        ]) || [];

      return connectedUrls;
    },
    {
      ...options,
      enabled: !!publicKey,
    }
  );
};
