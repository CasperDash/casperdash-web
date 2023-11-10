import { useCallback } from 'react';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { getConfigurations } from '@/services/casperdash/configuration/configuration.service';

const queryFn = async () => {
  return getConfigurations();
};

export const useGetConfigs = () => {
  return useQuery([QueryKeysEnum.CONFIGURATION], queryFn);
};

export const usePrefetchGetConfigs = () => {
  const queryClient = useQueryClient();

  const prefetch = useCallback(async () => {
    await queryClient.prefetchQuery([QueryKeysEnum.CONFIGURATION], queryFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return prefetch;
};
