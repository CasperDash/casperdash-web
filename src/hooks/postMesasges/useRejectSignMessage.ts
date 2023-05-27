import { useCallback } from 'react';

import { useGetConnectedUrl } from '../useGetConnectedUrl';
import { PostMessageMethodEnums } from '@/enums/postMessageMethod';
import { sendPostMessage } from '@/utils/serviceWorker/mesage';

export const useRejectSignMessage = () => {
  const connectedUrl = useGetConnectedUrl();

  const rejectSignMessage = useCallback(() => {
    sendPostMessage({
      method: PostMessageMethodEnums.REJECTED_SIGN_MESSAGE,
      originUrl: connectedUrl,
      params: {},
    });
  }, [connectedUrl]);

  return rejectSignMessage;
};
