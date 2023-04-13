import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { useSelector } from 'react-redux';

import { MutationKeysEnum } from '@/enums/mutationKeys.enum';
import { PostMessageMethodEnums } from '@/enums/postMessageMethod';
import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { publicKeySelector } from '@/store/wallet';
import { sendPostMessage } from '@/utils/serviceWorker/mesage';

export type Variables = {
  url: string;
};

export const useMutateSDKConnectUrl = (
  options?: UseMutationOptions<boolean, Error, Variables, unknown>
) => {
  const publicKey = useSelector(publicKeySelector);
  const queryClient = useQueryClient();
  return useMutation({
    ...options,
    mutationFn: async ({ url }: Variables) => {
      if (!publicKey) {
        throw new Error('public_key_not_found');
      }
      queryClient.setQueryData([QueryKeysEnum.CONNECTED_URL, publicKey], url);

      sendPostMessage({
        originUrl: url,
        method: PostMessageMethodEnums.CONNECTED,
        params: {
          publicKey,
        },
      });

      return true;
    },
    mutationKey: [MutationKeysEnum.SDK_CONNECT_URL, publicKey],
  });
};
