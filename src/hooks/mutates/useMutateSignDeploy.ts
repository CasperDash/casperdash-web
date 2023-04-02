import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import dayjs from 'dayjs';

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

export const useMutateSignDeploy = (
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
      });

      const signedDeploy = await casperUserUtil.signWithPrivateKey(
        buildedDeploy
      );

      return deploy(signedDeploy);
    },
    mutationKey: [MutationKeysEnum.SIGN_DEPLOY],
    onSuccess: (data, variables: DeployParams) => {
      queryClient.setQueryData(
        [QueryKeysEnum.TRANSACTION_HISTORIES, variables.fromPublicKeyHex],
        (oldTransactionHistories?: TransactionHistory[]) => {
          const newTransactionHistory = {
            ...variables,
            deployHash: data.deployHash,
            status: TransactionStatusEnum.PENDING,
            date: dayjs().toISOString(),
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
