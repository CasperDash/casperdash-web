import { useQueryClient } from '@tanstack/react-query';

import { useAccount } from './useAccount';
import { QueryKeysEnum } from '@/enums/queryKeys.enum';

type Params = {
  url: string;
};

export const useIsConnectedUrl = ({ url }: Params) => {
  const { publicKey } = useAccount();
  const queryClient = useQueryClient();

  const connectedUrls =
    queryClient.getQueryData<string[]>([
      QueryKeysEnum.CONNECTED_URLS,
      publicKey,
    ]) || [];

  return connectedUrls.includes(url);
};
