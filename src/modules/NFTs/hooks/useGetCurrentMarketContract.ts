import { UseQueryResult } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import {
  useGetMarketContractByPackageHash,
  Options,
} from '@/hooks/queries/useGetMarketContractByPackageHash';
import { ITokenContract } from '@/services/casperdash/market/type';

export const useGetCurrentMarketContract = (
  options?: Options
): UseQueryResult & {
  data: ITokenContract | undefined;
} => {
  const { contractAddress } = useParams();
  const queryData = useGetMarketContractByPackageHash(
    {
      packageHash: contractAddress,
    },
    options
  );

  return {
    ...queryData,
  };
};
