import {
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';

type Data = {
  slippage: number;
  deadline: number;
};

const DEFAULT_SETTINGS = {
  slippage: 0.5,
  deadline: 20,
};

export const useGetSwapSettings = (
  options: Omit<
    UseQueryOptions<Data, unknown, Data, [QueryKeysEnum.SWAP_SETTINGS]>,
    'queryKey' | 'queryFn'
  > = {}
) => {
  const queryClient = useQueryClient();
  return useQuery({
    ...options,
    queryFn: async () => {
      const swapSettings = queryClient.getQueryData([
        QueryKeysEnum.SWAP_SETTINGS,
      ]);
      if (!swapSettings) {
        return DEFAULT_SETTINGS;
      }

      return {
        ...DEFAULT_SETTINGS,
        ...swapSettings,
      };
    },
    queryKey: [QueryKeysEnum.SWAP_SETTINGS],
    networkMode: 'offlineFirst',
  });
};
