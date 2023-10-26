import {
  UseQueryOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import * as _ from 'lodash-es';

import { useAccount } from '../useAccount';
import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { TransactionStatusEnum } from '@/enums/transactionStatusEnum';
import { getDeployStatuses } from '@/services/casperdash/deploysStatus/deploysStatus.service';
import { DeployStatus } from '@/services/casperdash/deploysStatus/type';
import { NFTTransactionHistory } from '@/typings/nftTransactionHistory';

export const useGetNFTTransactions = (
  options?: Omit<
    UseQueryOptions<
      unknown,
      unknown,
      NFTTransactionHistory[],
      [QueryKeysEnum.NFT_TRANSACTION, string | undefined]
    >,
    'queryKey' | 'queryFn'
  >
) => {
  const { publicKey } = useAccount();
  const queryClient = useQueryClient();

  return useQuery(
    [QueryKeysEnum.NFT_TRANSACTION, publicKey],
    async () => {
      const transactionHistories =
        queryClient.getQueryData<NFTTransactionHistory[]>([
          QueryKeysEnum.NFT_TRANSACTION_HISTORY,
          publicKey,
        ]) || [];

      const pendingTransactionHistories = transactionHistories.filter(
        (transactionHistory: NFTTransactionHistory) =>
          transactionHistory.status === TransactionStatusEnum.PENDING
      );

      if (pendingTransactionHistories.length > 0) {
        const deployHashes = _.map(pendingTransactionHistories, 'deployHash');
        const deployStatuses = await getDeployStatuses({
          deployHash: deployHashes,
        });

        const mappedTxHistories = _.map(
          transactionHistories,
          (txHistory: NFTTransactionHistory) => {
            const foundDeployStatus = deployStatuses.find(
              (deployStatus: DeployStatus) =>
                deployStatus.hash.toLowerCase() ===
                txHistory.deployHash.toLowerCase()
            );

            if (!foundDeployStatus) {
              return txHistory;
            }

            return {
              ...txHistory,
              status: foundDeployStatus.status.toLowerCase(),
            };
          }
        );

        queryClient.setQueryData(
          [QueryKeysEnum.NFT_TRANSACTION_HISTORY, publicKey],
          mappedTxHistories
        );

        return mappedTxHistories;
      }

      return transactionHistories;
    },
    {
      refetchInterval: 5 * 1000,
      ...options,
      enabled: !!publicKey,
    }
  );
};
