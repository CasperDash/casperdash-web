import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { useMutateAddTransaction } from './useMutateAddTransaction';
import { useAccount } from '../useAccount';
import { Config } from '@/config';
import { AssetNamesEnum } from '@/enums/assetNames';
import { DeployActionsEnum } from '@/enums/deployActions';
import { DeployContextEnum } from '@/enums/deployContext';
import { DeployTypesEnum } from '@/enums/deployTypes';
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
  const { publicKey } = useAccount();
  const { mutateAsync } = useMutateAddTransaction(publicKey);

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

      if (result.deployHash) {
        await mutateAsync({
          fromPublicKeyHex,
          toPublicKeyHex,
          deployHash: result.deployHash,
          args: {
            amount,
            transferId,
            asset: AssetNamesEnum.CSPR,
          },
          context: DeployContextEnum.TRANSFER,
          action: DeployActionsEnum.TRANSFER,
          status: TransactionStatusEnum.PENDING,
          date: dayjs().toISOString(),
          paymentAmount: fee,
          type: DeployTypesEnum.TRANSFER,
        });
      }

      return result;
    },
  });
};
