import { PostMessageMethodEnums } from '@/enums/postMessageMethod';

type SendPostMessage = {
  method: PostMessageMethodEnums;
  originUrl: string;
  params?: Record<string, string | undefined>;
};

export const sendPostMessage = ({
  method,
  originUrl,
  params,
}: SendPostMessage) => {
  const requestId = 1;

  window.opener.postMessage(
    {
      jsonrpc: '2.0',
      id: requestId,
      method,
      params,
    },
    originUrl ?? ''
  );
};
