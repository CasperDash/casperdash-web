import {
  UseQueryOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import * as _ from 'lodash-es';

import { DeployContextEnum } from '@/enums/deployContext';
import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { TransactionStatusEnum } from '@/enums/transactionStatusEnum';
import { getDeployStatuses } from '@/services/casperdash/deploysStatus/deploysStatus.service';
import { DeployStatus } from '@/services/casperdash/deploysStatus/type';
import { TransactionHistory } from '@/typings/transactionHistory';
import { TransactionHistoryStorage } from '@/utils/localForage/transactionHistory';

export const useGetTransactions = (
  publicKey?: string,
  options?: Omit<
    UseQueryOptions<
      unknown,
      unknown,
      TransactionHistory[],
      [QueryKeysEnum.TRANSACTIONS, string | undefined]
    >,
    'queryKey' | 'queryFn'
  >
) => {
  const clientQuery = useQueryClient();

  return useQuery(
    [QueryKeysEnum.TRANSACTIONS, publicKey],
    async () => {
      const transactionHistoryStorage = new TransactionHistoryStorage(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        publicKey!
      );
      const transactionHistories =
        await transactionHistoryStorage.getTransactionHistories();

      // Sort by date
      const sortedTransactionHistories = _.orderBy(
        transactionHistories,
        ['date'],
        ['desc']
      );

      const pendingTransactionHistories = sortedTransactionHistories.filter(
        (transactionHistory: TransactionHistory) =>
          [
            TransactionStatusEnum.PENDING,
            TransactionStatusEnum.UNDELEGATING,
          ].includes(transactionHistory.status)
      );

      if (pendingTransactionHistories.length > 0) {
        const deployHashes = _.map(pendingTransactionHistories, 'deployHash');
        const deployStatuses = await getDeployStatuses({
          deployHash: deployHashes,
        });

        let trackingUpdatedDeploys: TransactionHistory[] = [];

        const mappedTxHistories = _.map(
          sortedTransactionHistories,
          (txHistory: TransactionHistory) => {
            const foundDeployStatus = deployStatuses.find(
              (deployStatus: DeployStatus) =>
                deployStatus.hash.toLowerCase() ===
                txHistory.deployHash.toLowerCase()
            );

            if (!foundDeployStatus) {
              return txHistory;
            }

            const status = foundDeployStatus.status.toLowerCase();
            if (status !== TransactionStatusEnum.PENDING) {
              trackingUpdatedDeploys = [...trackingUpdatedDeploys, txHistory];
            }

            return {
              ...txHistory,
              status,
            };
          }
        );

        await transactionHistoryStorage.setItem(mappedTxHistories);

        const isUpdatedMarketNFTs = trackingUpdatedDeploys.some(
          (trackingUpdatedDeploy: TransactionHistory) =>
            trackingUpdatedDeploy.context === DeployContextEnum.NFT
        );

        if (isUpdatedMarketNFTs) {
          // TODO: Improve this logic to invalidate only the market nfts
          await clientQuery.invalidateQueries();
          clientQuery.getQueryCache().clear();
        }

        return mappedTxHistories;
      }

      return sortedTransactionHistories;
    },
    {
      refetchInterval: 5 * 1000,
      ...options,
      enabled: !!publicKey,
    }
  );
};
