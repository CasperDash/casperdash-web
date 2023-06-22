import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import dayjs from 'dayjs';

import { Config } from '@/config';
import { MutationKeysEnum } from '@/enums/mutationKeys.enum';
import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { StakingActionEnum } from '@/enums/staking';
import { TransactionStatusEnum } from '@/enums/transactionStatusEnum';
import { deploy } from '@/services/casperdash/deploy/deploy.service';
import { DeployResponse } from '@/services/casperdash/deploy/type';
import { StakingTransactionHistory } from '@/typings/stakingTransactionHistory';
import { buildStakeUndelegateDeploy } from '@/utils/casper/builder';
import casperUserUtil from '@/utils/casper/casperUser';

type DeployParams = {
  fromPublicKeyHex: string;
  validatorPublicKeyHex: string;
  amount: number;
  fee: number;
  asset?: string;
};

export const useMutateStakeUndelegate = (
  validatorPublicKey: string,
  options?: UseMutationOptions<DeployResponse, unknown, DeployParams, unknown>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: async ({
      fromPublicKeyHex,
      validatorPublicKeyHex,
      amount,
      fee,
    }: DeployParams) => {
      const buildedDeploy = buildStakeUndelegateDeploy({
        fromAddress: fromPublicKeyHex,
        validator: validatorPublicKeyHex,
        fee,
        amount,
        network: Config.networkName,
      });

      const signedDeploy = await casperUserUtil.signWithPrivateKey(
        buildedDeploy
      );

      const result = await deploy(signedDeploy);

      queryClient.setQueryData(
        [QueryKeysEnum.STAKING_TRANSACTION_HISTORIES, fromPublicKeyHex],
        (oldTransactionHistories?: StakingTransactionHistory[]) => {
          const newTransactionHistory = {
            fromPublicKeyHex,
            validatorPublicKeyHex,
            amount,
            fee,
            deployHash: result.deployHash,
            status: TransactionStatusEnum.PENDING,
            date: dayjs().toISOString(),
            action: StakingActionEnum.UNDELEGATE,
          };

          if (!oldTransactionHistories) {
            return [newTransactionHistory];
          }

          return [newTransactionHistory, ...oldTransactionHistories];
        }
      );

      return result;
    },
    mutationKey: [MutationKeysEnum.STAKE_UNDELEGATE, validatorPublicKey],
  });
};
