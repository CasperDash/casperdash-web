import {
  useQueryClient,
  useMutation,
  UseMutationOptions,
} from '@tanstack/react-query';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';

type Params = {
  slippage?: number;
  deadline?: number;
};

type MutateVariables = Params;
type Data = Params;

export const useMutateSwapSettings = (
  options: UseMutationOptions<Data, unknown, MutateVariables, unknown>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: async (newSettings: Params) => {
      queryClient.setQueryData(
        [QueryKeysEnum.SWAP_SETTINGS],
        (oldSettings: Params = {}) => ({
          ...oldSettings,
          ...newSettings,
        })
      );

      return newSettings;
    },
    networkMode: 'offlineFirst',
  });
};
