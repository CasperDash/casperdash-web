import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';

export const useGetLocked = (
  options?: Omit<
    UseQueryOptions<unknown, unknown, boolean, [QueryKeysEnum.LOCKED]>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery([QueryKeysEnum.LOCKED], {
    ...options,
  });
};
