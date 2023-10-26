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
    UseQueryOptions<Result, unknown, Result>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery([QueryKeysEnum.DEPLOY_STATUS, transactionHash!], {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    queryFn: async () => {
      const deployStatuses = await getDeployStatuses({
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
    ...options,
  });
};
