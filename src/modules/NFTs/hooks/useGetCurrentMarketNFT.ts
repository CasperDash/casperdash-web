import { useParams } from 'react-router-dom';

import { useGetContractPackageInfo } from '@/hooks/queries/useGetContractPackageInfo';
import {
  useGetMarketNFT,
  UseGetMarketNFTOptions,
} from '@/hooks/queries/useGetMarketNFT';

type Options = UseGetMarketNFTOptions;

export const useGetCurrentMarketNFT = (options?: Options) => {
  const params = useParams();
  const { contractAddress, tokenId } = useParams();
  const {
    data: contractPackageInfo,
    isSuccess,
    isLoading,
  } = useGetContractPackageInfo(contractAddress);

  const queryData = useGetMarketNFT(
    {
      tokenAddress: contractPackageInfo?.contract_hash,
      tokenId: params.tokenId!,
    },
    {
      ...options,
      enabled: !!contractAddress && !!tokenId && !!contractPackageInfo,
    }
  );

  return {
    ...queryData,
    isSuccess: queryData.isSuccess && isSuccess,
    isLoading: queryData.isLoading || isLoading,
  };
};
