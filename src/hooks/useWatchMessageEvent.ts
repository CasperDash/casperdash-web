import { useEffect } from 'react';

import { RepliedMessageMethodEnums } from '@/enums/postMessageMethod';

type Params = Record<string, string | undefined>;
type ReplyEvent = MessageEvent<{
  id: number;
  method: RepliedMessageMethodEnums;
  params: Record<string, string | undefined>;
  result?: string;
  error?: string;
}>;

type Props = {
  onHandle: (
    method: RepliedMessageMethodEnums,
    params: Params
  ) => Promise<void> | void;
};

export const useWatchMessageEvent = ({ onHandle }: Props) => {
  useEffect(() => {
    const handleMessage = (event: ReplyEvent) => {
      const { method, params } = event.data;

      if (!method) {
        return;
      }

      onHandle(method, params);
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
