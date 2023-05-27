import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { JsonTypes } from 'typedjson';

import { useApproveSign } from '../postMesasges/useApproveSign';
import { SignDeployParams } from '@/typings/signingParams';
import casperUserUtil from '@/utils/casper/casperUser';

export const useMutateSignDeploy = (
  options?: UseMutationOptions<
    { deploy: JsonTypes },
    unknown,
    SignDeployParams,
    unknown
  >
) => {
  const approveSign = useApproveSign();
  return useMutation({
    ...options,
    mutationFn: async ({ deploy: deployJson }: SignDeployParams) => {
      const signedDeploy = await casperUserUtil.signPrivateKeyProcess({
        deployJSON: deployJson,
      });

      approveSign(signedDeploy);

      return signedDeploy;
    },
  });
};
