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

type Options = UseQueryOptions<
  Result,
  unknown,
  Result,
  [QueryKeysEnum, string | undefined]
>;

export const useGetDeployStatus = (
  { transactionHash }: Params,
  options?: Options
) => {
  return useQuery({
    ...options,
    queryKey: [QueryKeysEnum.DEPLOY_STATUS, transactionHash!],
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
