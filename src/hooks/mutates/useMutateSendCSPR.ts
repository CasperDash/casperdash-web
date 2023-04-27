import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import dayjs from 'dayjs';

import { Config } from '@/config';
import { MutationKeysEnum } from '@/enums/mutationKeys.enum';
import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { TransactionStatusEnum } from '@/enums/transactionStatusEnum';
import { deploy } from '@/services/casperdash/deploy/deploy.service';
import { DeployResponse } from '@/services/casperdash/deploy/type';
import { buildTransferDeploy } from '@/utils/casper/builder';
import casperUserUtil from '@/utils/casper/casperUser';

type DeployParams = {
  fromPublicKeyHex: string;
  toPublicKeyHex: string;
  amount: number;
  transferId: number;
  fee: number;
};

export const useMutateSendCSPR = (
  options?: UseMutationOptions<DeployResponse, unknown, DeployParams, unknown>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    ...options,
    mutationFn: async ({
      fromPublicKeyHex,
      toPublicKeyHex,
      amount,
      transferId,
      fee,
    }: DeployParams) => {
      const buildedDeploy = buildTransferDeploy({
        fromPublicKeyHex,
        toPublicKeyHex,
        amount,
        transferId,
        fee,
        network: Config.networkName,
      });

      const signedDeploy = await casperUserUtil.signWithPrivateKey(
        buildedDeploy
      );

      const result = await deploy(signedDeploy);

      queryClient.setQueryData(
        [QueryKeysEnum.TRANSACTION_HISTORIES, fromPublicKeyHex],
        (oldTransactionHistories?: TransactionHistory[]) => {
          const newTransactionHistory = {
            fromPublicKeyHex,
            toPublicKeyHex,
            amount,
            transferId,
            fee,
            deployHash: result.deployHash,
            status: TransactionStatusEnum.PENDING,
            date: dayjs().toISOString(),
            isCSPR: true,
            asset: 'CSPR',
          };
          if (!oldTransactionHistories) {
            return [newTransactionHistory];
          }

          return [newTransactionHistory, ...oldTransactionHistories];
        }
      );

      return result;
    },
    mutationKey: [MutationKeysEnum.SEND_ASSET],
  });
};
