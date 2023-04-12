import { useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { publicKeySelector } from '@/store/wallet';

type Params = {
  url: string;
};

export const useIsConnectedUrl = ({ url }: Params) => {
  const publicKey = useSelector(publicKeySelector);
  const queryClient = useQueryClient();

  const connectedUrls =
    queryClient.getQueryData<string[]>([
      QueryKeysEnum.CONNECTED_URLS,
      publicKey,
    ]) || [];

  return connectedUrls.includes(url);
};
