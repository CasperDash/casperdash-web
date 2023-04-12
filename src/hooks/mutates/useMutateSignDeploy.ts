import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { JsonTypes } from 'typedjson';

import { PostMessageMethodEnums } from '@/enums/postMessageMethod';
import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { publicKeySelector } from '@/store/wallet';
import { SignDeployParams } from '@/typings/signingParams';
import casperUserUtil from '@/utils/casper/casperUser';
import { sendPostMessage } from '@/utils/serviceWorker/mesage';

export const useMutateSignDeploy = (
  options?: UseMutationOptions<
    { deploy: JsonTypes },
    unknown,
    SignDeployParams,
    unknown
  >
) => {
  const queryClient = useQueryClient();
  const publicKey = useSelector(publicKeySelector);
  return useMutation({
    ...options,
    mutationFn: async ({ deploy: deployJson }: SignDeployParams) => {
      const signedDeploy = await casperUserUtil.signPrivateKeyProcess({
        deployJSON: deployJson,
      });
      const connectedUrl = queryClient.getQueryData<string>([
        QueryKeysEnum.CONNECTED_URL,
        publicKey,
      ]);

      sendPostMessage({
        method: PostMessageMethodEnums.APPROVED_SIGN,
        originUrl: connectedUrl,
        params: {
          deploy: signedDeploy,
        },
      });

      return signedDeploy;
    },
  });
};
