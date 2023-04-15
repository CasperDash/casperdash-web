import { useCallback } from 'react';

import { useGetConnectedUrl } from '../useGetConnectedUrl';
import { PostMessageMethodEnums } from '@/enums/postMessageMethod';
import { sendPostMessage } from '@/utils/serviceWorker/mesage';

export const useDisconnectToDapp = () => {
  const connectedUrl = useGetConnectedUrl();

  const handleDisconnect = useCallback(() => {
    if (!connectedUrl) {
      return;
    }
    sendPostMessage({
      originUrl: connectedUrl,
      method: PostMessageMethodEnums.DISCONNECTED,
      params: {},
    });
  }, [connectedUrl]);

  return handleDisconnect;
};
