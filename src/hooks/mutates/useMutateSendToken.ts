import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { useMutateAddTransaction } from './useMutateAddTransaction';
import { useAccount } from '../useAccount';
import { Config } from '@/config';
import { DeployActionsEnum } from '@/enums/deployActions';
import { DeployContextEnum } from '@/enums/deployContext';
import { DeployTypesEnum } from '@/enums/deployTypes';
import { TransactionStatusEnum } from '@/enums/transactionStatusEnum';
import { deploy } from '@/services/casperdash/deploy/deploy.service';
import { DeployResponse } from '@/services/casperdash/deploy/type';
import { buildTransferTokenDeploy } from '@/utils/casper/builder';
import casperUserUtil from '@/utils/casper/casperUser';

type DeployParams = {
  fromPublicKeyHex: string;
  toPublicKeyHex: string;
  amount: number;
  contractHash: string;
  fee: number;
  asset?: string;
};

export const useMutateSendToken = (
  options?: UseMutationOptions<DeployResponse, unknown, DeployParams, unknown>
) => {
  const { publicKey } = useAccount();
  const { mutateAsync } = useMutateAddTransaction(publicKey);

  return useMutation({
    ...options,
    mutationFn: async ({
      fromPublicKeyHex,
      toPublicKeyHex,
      contractHash,
      amount,
      fee,
      asset,
    }: DeployParams) => {
      const buildedDeploy = buildTransferTokenDeploy({
        fromPublicKeyHex,
        toPublicKeyHex,
        amount,
        fee,
        contractHash,
        network: Config.networkName,
      });

      const signedDeploy = await casperUserUtil.signWithPrivateKey(
        buildedDeploy
      );

      const result = await deploy(signedDeploy);

      if (result?.deployHash) {
        await mutateAsync({
          fromPublicKeyHex,
          toPublicKeyHex,
          deployHash: result.deployHash,
          args: {
            amount,
            asset,
          },
          context: DeployContextEnum.TRANSFER,
          action: DeployActionsEnum.TRANSFER,
          status: TransactionStatusEnum.PENDING,
          date: dayjs().toISOString(),
          paymentAmount: fee,
          type: DeployTypesEnum.CONTRACT_CALL,
        });
      }

      return result;
    },
  });
};
