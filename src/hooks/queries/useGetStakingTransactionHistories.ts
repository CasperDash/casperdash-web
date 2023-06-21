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
import { StakingTransactionHistory } from '@/typings/stakingTransactionHistory';

export const useGetStakingTransactionHistories = (
  options?: Omit<
    UseQueryOptions<
      StakingTransactionHistory[],
      unknown,
      StakingTransactionHistory[],
      [QueryKeysEnum.STAKING_TRANSACTION_HISTORIES, string | undefined]
    >,
    'queryKey' | 'queryFn'
  >
) => {
  const { publicKey } = useAccount();
  const queryClient = useQueryClient();

  return useQuery(
    [QueryKeysEnum.STAKING_TRANSACTION_HISTORIES, publicKey],
    async () => {
      const transactionHistories =
        queryClient.getQueryData<StakingTransactionHistory[]>([
          QueryKeysEnum.STAKING_TRANSACTION_HISTORIES,
          publicKey,
        ]) || [];

      const pendingTransactionHistories = transactionHistories.filter(
        (transactionHistory: StakingTransactionHistory) =>
          transactionHistory.status === TransactionStatusEnum.PENDING
      );

      if (pendingTransactionHistories.length > 0) {
        const deployHashes = _.map(pendingTransactionHistories, 'deployHash');
        const deployStatuses = await getDeployStatuses({
          deployHash: deployHashes,
        });

        let isHaveCompletedDeploy = false;
        const mappedTxHistories = _.map(
          transactionHistories,
          (txHistory: StakingTransactionHistory) => {
            const foundDeployStatus = deployStatuses.find(
              (deployStatus: DeployStatus) =>
                deployStatus.hash.toLowerCase() ===
                txHistory.deployHash.toLowerCase()
            );

            if (!foundDeployStatus) {
              return txHistory;
            }

            if (
              foundDeployStatus.status.toLowerCase() ===
              TransactionStatusEnum.COMPLETED
            ) {
              isHaveCompletedDeploy = true;
            }

            return {
              ...txHistory,
              status: foundDeployStatus.status.toLowerCase(),
            };
          }
        );

        if (isHaveCompletedDeploy) {
          await queryClient.invalidateQueries([
            QueryKeysEnum.ACCOUNT_DELEGATION,
            publicKey,
          ]);
          await queryClient.invalidateQueries([
            QueryKeysEnum.ACCOUNT_BALANCES,
            publicKey,
          ]);
        }

        queryClient.setQueryData(
          [QueryKeysEnum.STAKING_TRANSACTION_HISTORIES, publicKey],
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
