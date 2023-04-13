import {
  UseQueryOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useSelector } from 'react-redux';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { publicKeySelector } from '@/store/wallet';

export const useGetConnectedUrl = (
  options?: Omit<
    UseQueryOptions<
      unknown,
      unknown,
      string,
      [QueryKeysEnum.CONNECTED_URL, string | undefined]
    >,
    'queryKey' | 'queryFn'
  >
) => {
  const publicKey = useSelector(publicKeySelector);
  const queryClient = useQueryClient();

  return useQuery(
    [QueryKeysEnum.CONNECTED_URL, publicKey],
    async () => {
      const connectedUrl = queryClient.getQueryData<string>([
        QueryKeysEnum.CONNECTED_URL,
        publicKey,
      ]);

      return connectedUrl;
    },
    {
      ...options,
      enabled: !!publicKey,
    }
  );
};
