import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { getContractPackageInfo } from '@/services/casperdash/contractPackage/contractPackage.service';
import { IContractPackage } from '@/services/casperdash/contractPackage/type';

export const useGetContractPackageInfo = (
  contractPackageHash?: string,
  options?: UseQueryOptions<
    IContractPackage,
    unknown,
    IContractPackage,
    [string, string | undefined]
  >
) => {
  return useQuery({
    ...options,
    queryKey: [QueryKeysEnum.CONTRACTS, contractPackageHash],
    queryFn: () => getContractPackageInfo(contractPackageHash!),
    enabled: !!contractPackageHash,
  });
};
