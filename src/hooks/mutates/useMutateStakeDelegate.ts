import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { useMutateAddTransaction } from './useMutateAddTransaction';
import { useAccount } from '../useAccount';
import { Config } from '@/config';
import { DeployActionsEnum } from '@/enums/deployActions';
import { DeployContextEnum } from '@/enums/deployContext';
import { DeployTypesEnum } from '@/enums/deployTypes';
import { MutationKeysEnum } from '@/enums/mutationKeys.enum';
import { TransactionStatusEnum } from '@/enums/transactionStatusEnum';
import { deploy } from '@/services/casperdash/deploy/deploy.service';
import { DeployResponse } from '@/services/casperdash/deploy/type';
import { buildStakeDelegateDeploy } from '@/utils/casper/builder';
import casperUserUtil from '@/utils/casper/casperUser';

type DeployParams = {
  fromPublicKeyHex: string;
  validatorPublicKeyHex: string;
  amount: number;
  fee: number;
};

export const useMutateStakeDelegate = (
  options?: UseMutationOptions<DeployResponse, unknown, DeployParams, unknown>
) => {
  const { publicKey } = useAccount();
  const { mutateAsync } = useMutateAddTransaction(publicKey);

  return useMutation({
    ...options,
    mutationFn: async ({
      fromPublicKeyHex,
      validatorPublicKeyHex,
      amount,
      fee,
    }: DeployParams) => {
      const buildedDeploy = buildStakeDelegateDeploy({
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

      if (result?.deployHash) {
        await mutateAsync({
          fromPublicKeyHex,
          deployHash: result.deployHash,
          args: {
            amount,
            validator: validatorPublicKeyHex,
          },
          context: DeployContextEnum.STAKING,
          action: DeployActionsEnum.DELEGATE,
          status: TransactionStatusEnum.PENDING,
          date: dayjs().toISOString(),
          paymentAmount: fee,
          type: DeployTypesEnum.CONTRACT_CALL,
        });
      }

      return result;
    },
    mutationKey: [MutationKeysEnum.STAKE_DELEGATE],
  });
};
