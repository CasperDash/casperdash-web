import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { MutationKeysEnum } from '@/enums/mutationKeys.enum';
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
  });
};
