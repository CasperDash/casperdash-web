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
import { NFTTransactionHistory } from '@/typings/nftTransactionHistory';
import { TransactionHistoryStorage } from '@/utils/localForage/transactionHistory';

export const useGetTransactions = (
  publicKey?: string,
  options?: Omit<
    UseQueryOptions<
      unknown,
      unknown,
      NFTTransactionHistory[],
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
        publicKey!
      );
      const transactionHistories =
        await transactionHistoryStorage.getTransactionHistories();
      const pendingTransactionHistories = transactionHistories.filter(
        (transactionHistory: NFTTransactionHistory) =>
          transactionHistory.status === TransactionStatusEnum.PENDING
      );

      if (pendingTransactionHistories.length > 0) {
        const deployHashes = _.map(pendingTransactionHistories, 'deployHash');
        const deployStatuses = await getDeployStatuses({
          deployHash: deployHashes,
        });

        let trackingUpdatedDeploys: NFTTransactionHistory[] = [];

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
          (trackingUpdatedDeploy: NFTTransactionHistory) =>
            trackingUpdatedDeploy.context === DeployContextEnum.NFT
        );

        if (isUpdatedMarketNFTs) {
          // TODO: Improve this logic to invalidate only the market nfts
          await clientQuery.invalidateQueries();
        }

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
