import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { TransactionStatusEnum } from '@/enums/transactionStatusEnum';
import { getDeployStatuses } from '@/services/casperdash/deploysStatus/deploysStatus.service';

type Result = {
  status: TransactionStatusEnum;
};

type Params = {
  transactionHash?: string;
};

export const useGetDeployStatus = (
  { transactionHash }: Params,
  options?: Omit<
    UseQueryOptions<unknown, unknown, Result, [string, string | undefined]>,
    'queryKey'
  >
) => {
  return useQuery([QueryKeysEnum.DEPLOY_STATUS, transactionHash!], {
    ...options,
    queryFn: async () => {
      const deployStatuses = await getDeployStatuses({
        deployHash: [transactionHash!],
      });

      if (deployStatuses.length === 0) {
        return { status: TransactionStatusEnum.PENDING };
      }

      const [deployStatus] = deployStatuses;

      return {
        status: deployStatus.status.toLowerCase(),
      };
    },
    enabled: !!transactionHash,
    refetchInterval: 5000,
  });
};
