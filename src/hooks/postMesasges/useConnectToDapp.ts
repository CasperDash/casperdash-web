import { useCallback } from 'react';

import { PostMessageMethodEnums } from '@/enums/postMessageMethod';
import { useAppDispatch } from '@/store';
import { connectToDapp } from '@/store/sdk';
import { sendPostMessage } from '@/utils/serviceWorker/mesage';

export const useConnectToDapp = () => {
  const dispatch = useAppDispatch();
  const handleConnect = useCallback(
    (connectedUrl: string, publicKey: string) => {
      dispatch(connectToDapp(connectedUrl));

      sendPostMessage({
        originUrl: connectedUrl,
        method: PostMessageMethodEnums.CONNECTED,
        params: {
          publicKey,
        },
      });
    },
    []
  );

  return handleConnect;
};
