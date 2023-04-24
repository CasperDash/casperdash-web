import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';

import { useAccount } from '../useAccount';
import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { Token } from '@/typings/token';

export const useMutateAddMyToken = (
  options?: UseMutationOptions<Token, unknown, Token, unknown>
) => {
  const { publicKey } = useAccount();
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: async (variables: Token) => {
      queryClient.setQueryData(
        [QueryKeysEnum.MY_TOKENS, publicKey],
        (oldTokens: Token[] = []) => {
          const newToken = {
            ...variables,
          };

          return [newToken, ...oldTokens];
        }
      );
      await queryClient.invalidateQueries([QueryKeysEnum.MY_TOKENS]);

      return variables;
    },
    networkMode: 'offlineFirst',
  });
};
