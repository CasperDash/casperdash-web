import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { useApproveSignMessage } from '../postMesasges/useApproveSignMessage';
import { SignMessageParams } from '@/typings/signingParams';
import casperUserUtil from '@/utils/casper/casperUser';

export const useMutateSignMessage = (
  options?: UseMutationOptions<string, unknown, SignMessageParams, unknown>
) => {
  const approveSignMessage = useApproveSignMessage();

  return useMutation({
    ...options,
    mutationFn: async ({ message }: SignMessageParams) => {
      const signedMessage = await casperUserUtil.signMessage(message);

      approveSignMessage(signedMessage);

      return signedMessage;
    },
  });
};
