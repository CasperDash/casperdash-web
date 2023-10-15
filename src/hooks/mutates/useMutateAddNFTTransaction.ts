import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { NFTTransactionHistory } from '@/typings/nftTransactionHistory';

export type Variables = NFTTransactionHistory;

export const useMutateAddNFTTransaction = (
  fromPublicKeyHex: string,
  options?: UseMutationOptions<void, unknown, Variables, unknown>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: async (variables: Variables) => {
      queryClient.setQueryData(
        [QueryKeysEnum.NFT_TRANSACTION_HISTORY, fromPublicKeyHex],
        (oldTransactionHistories?: NFTTransactionHistory[]) => {
          const newTransactionHistory = {
            ...variables,
          };
          if (!oldTransactionHistories) {
            return [newTransactionHistory];
          }

          return [newTransactionHistory, ...oldTransactionHistories];
        }
      );
    },
  });
};
