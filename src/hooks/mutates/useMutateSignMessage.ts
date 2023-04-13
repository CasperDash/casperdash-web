import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { useSelector } from 'react-redux';

import { PostMessageMethodEnums } from '@/enums/postMessageMethod';
import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { publicKeySelector } from '@/store/wallet';
import { SignMessageParams } from '@/typings/signingParams';
import casperUserUtil from '@/utils/casper/casperUser';
import { sendPostMessage } from '@/utils/serviceWorker/mesage';

export const useMutateSignMessage = (
  options?: UseMutationOptions<string, unknown, SignMessageParams, unknown>
) => {
  const queryClient = useQueryClient();
  const publicKey = useSelector(publicKeySelector);

  return useMutation({
    ...options,
    mutationFn: async ({ message }: SignMessageParams) => {
      const signedMessage = await casperUserUtil.signMessage(message);
      const connectedUrl = queryClient.getQueryData<string>([
        QueryKeysEnum.CONNECTED_URL,
        publicKey,
      ]);

      sendPostMessage({
        method: PostMessageMethodEnums.APPROVED_SIGN_MESSAGE,
        originUrl: connectedUrl,
        params: {
          signedMessage: signedMessage,
        },
      });

      return signedMessage;
    },
  });
};
