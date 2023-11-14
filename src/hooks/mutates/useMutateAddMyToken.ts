import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';

import { useAccount } from '../useAccount';
import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { Token } from '@/typings/token';
import { TokenStorage } from '@/utils/localForage/token';

export const useMutateAddMyToken = (
  options?: UseMutationOptions<Token, unknown, Token, unknown>
) => {
  const { publicKey } = useAccount();
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: async (variables: Token) => {
      const tokenStorage = new TokenStorage(publicKey!);

      await tokenStorage.pushToken(variables);

      await queryClient.invalidateQueries([QueryKeysEnum.MY_TOKENS, publicKey]);

      return variables;
    },
    networkMode: 'offlineFirst',
  });
};
