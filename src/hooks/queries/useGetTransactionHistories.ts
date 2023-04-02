import {
  UseQueryOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useSelector } from 'react-redux';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { publicKeySelector } from '@/store/wallet';

export const useGetTransactionHistories = (
  options?: Omit<
    UseQueryOptions<
      unknown,
      unknown,
      TransactionHistory[],
      [QueryKeysEnum.TRANSACTION_HISTORIES, string | undefined]
    >,
    'queryKey' | 'queryFn'
  >
) => {
  const publicKey = useSelector(publicKeySelector);
  const queryClient = useQueryClient();

  return useQuery(
    [QueryKeysEnum.TRANSACTION_HISTORIES, publicKey],
    () =>
      queryClient.getQueryData([
        QueryKeysEnum.TRANSACTION_HISTORIES,
        publicKey,
      ]),
    {
      ...options,
      enabled: !!publicKey,
    }
  );
};
