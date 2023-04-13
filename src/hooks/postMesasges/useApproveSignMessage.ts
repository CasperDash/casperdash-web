import { useCallback } from 'react';

import { useGetConnectedUrl } from '../useGetConnectedUrl';
import { PostMessageMethodEnums } from '@/enums/postMessageMethod';
import { sendPostMessage } from '@/utils/serviceWorker/mesage';

export const useApproveSignMessage = () => {
  const connectedUrl = useGetConnectedUrl();

  const handleApproveSign = useCallback(
    (signedMessage: string) => {
      sendPostMessage({
        method: PostMessageMethodEnums.APPROVED_SIGN_MESSAGE,
        originUrl: connectedUrl,
        params: {
          signedMessage,
        },
      });
    },
    [connectedUrl]
  );

  return handleApproveSign;
};
