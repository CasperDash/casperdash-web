import { useParams } from 'react-router-dom';

import { useGetContractPackageInfo } from '@/hooks/queries/useGetContractPackageInfo';
import {
  useGetMarketContract,
  UseGetMarketContractOptions,
} from '@/hooks/queries/useGetMarketContract';

export const useGetCurrentMarketContract = (
  options?: UseGetMarketContractOptions
) => {
  const { contractAddress } = useParams();
  const { data: contractPackageInfo, isLoading } =
    useGetContractPackageInfo(contractAddress);

  const queryData = useGetMarketContract(
    { tokenAddress: contractPackageInfo?.contract_hash },
    options
  );

  return {
    ...queryData,
    isLoading: queryData.isLoading || isLoading || !contractAddress,
  };
};
