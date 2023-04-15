import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';

import { useConnectToDapp } from '../postMesasges/useConnectToDapp';
import { useAccount } from '../useAccount';
import { MutationKeysEnum } from '@/enums/mutationKeys.enum';
import { QueryKeysEnum } from '@/enums/queryKeys.enum';

export type Variables = {
  url: string;
};

export const useMutateSDKConnectUrl = (
  options?: UseMutationOptions<boolean, Error, Variables, unknown>
) => {
  const { publicKey } = useAccount();
  const queryClient = useQueryClient();
  const connect = useConnectToDapp();
  return useMutation({
    ...options,
    mutationFn: async ({ url }: Variables) => {
      if (!publicKey) {
        throw new Error('public_key_not_found');
      }
      queryClient.setQueryData([QueryKeysEnum.CONNECTED_URL, publicKey], url);

      connect(url, publicKey);

      return true;
    },
    mutationKey: [MutationKeysEnum.SDK_CONNECT_URL, publicKey],
  });
};
