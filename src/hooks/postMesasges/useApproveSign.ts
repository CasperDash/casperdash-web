import { useCallback } from 'react';

import { JsonTypes } from 'typedjson';

import { useGetConnectedUrl } from '../useGetConnectedUrl';
import { PostMessageMethodEnums } from '@/enums/postMessageMethod';
import { sendPostMessage } from '@/utils/serviceWorker/mesage';

export const useApproveSign = () => {
  const connectedUrl = useGetConnectedUrl();

  const handleApproveSign = useCallback(
    (signedDeploy: { deploy: JsonTypes }) => {
      sendPostMessage({
        method: PostMessageMethodEnums.APPROVED_SIGN,
        originUrl: connectedUrl,
        params: {
          deploy: signedDeploy,
        },
      });
    },
    [connectedUrl]
  );

  return handleApproveSign;
};
