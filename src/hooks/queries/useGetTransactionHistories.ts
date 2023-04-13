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
  const { publicKey } = useAccount();
  const queryClient = useQueryClient();

  return useQuery(
    [QueryKeysEnum.TRANSACTION_HISTORIES, publicKey],
    async () => {
      const transactionHistories =
        queryClient.getQueryData<TransactionHistory[]>([
          QueryKeysEnum.TRANSACTION_HISTORIES,
          publicKey,
        ]) || [];

      const pendingTransactionHistories = transactionHistories.filter(
        (transactionHistory: TransactionHistory) =>
          transactionHistory.status === TransactionStatusEnum.PENDING
      );

      if (pendingTransactionHistories.length > 0) {
        const deployHashes = _.map(pendingTransactionHistories, 'deployHash');
        const deployStatuses = await getDeployStatuses({
          deployHash: deployHashes,
        });

        const mappedTxHistories = _.map(
          transactionHistories,
          (txHistory: TransactionHistory) => {
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
          [QueryKeysEnum.TRANSACTION_HISTORIES, publicKey],
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
