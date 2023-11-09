import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { TransactionHistory } from '@/typings/transactionHistory';
import { TransactionHistoryStorage } from '@/utils/localForage/transactionHistory';

export type Variables = TransactionHistory;

export const useMutateAddTransaction = (
  fromPublicKeyHex?: string,
  options?: UseMutationOptions<void, unknown, Variables, unknown>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    ...options,
    mutationFn: async (variables: Variables) => {
      const newTransactionHistory = {
        ...variables,
      };

      const transactionStorage = new TransactionHistoryStorage(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        fromPublicKeyHex!
      );

      await transactionStorage.pushTransactionHistory(newTransactionHistory);

      await queryClient.invalidateQueries([
        QueryKeysEnum.TRANSACTIONS,
        fromPublicKeyHex,
      ]);
    },
  });
};
