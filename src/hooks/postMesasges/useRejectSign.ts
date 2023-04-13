import { useCallback } from 'react';

import { useGetConnectedUrl } from '../useGetConnectedUrl';
import { PostMessageMethodEnums } from '@/enums/postMessageMethod';
import { sendPostMessage } from '@/utils/serviceWorker/mesage';

export const useRejectSign = () => {
  const connectedUrl = useGetConnectedUrl();

  const rejectSign = useCallback(() => {
    sendPostMessage({
      method: PostMessageMethodEnums.REJECTED_SIGN,
      originUrl: connectedUrl,
      params: {},
    });
  }, [connectedUrl]);

  return rejectSign;
};
