import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { useGetContractPackageInfo } from '@/hooks/queries/useGetContractPackageInfo';
import { getMarketNFT } from '@/services/casperdash/market/nft.service';
import { IMarketNFT } from '@/services/casperdash/market/type';

export const useGetCurrentMarketNFT = (
  options?: UseQueryOptions<
    IMarketNFT,
    unknown,
    IMarketNFT,
    [string, Record<string, string | undefined>]
  >
) => {
  const { contractAddress, tokenId } = useParams();
  const {
    data: contractPackageInfo,
    isSuccess,
    isLoading,
  } = useGetContractPackageInfo(contractAddress);

  const queryData = useQuery({
    ...options,
    queryKey: [
      QueryKeysEnum.MARKET_NFTS,
      {
        contractAddress: contractAddress,
        tokenId,
      },
    ],
    queryFn: async () => {
      if (!contractAddress || !tokenId) {
        throw new Error('Contract address or token id is not provided');
      }

      return await getMarketNFT(contractPackageInfo!.contract_hash, tokenId);
    },
    enabled: !!contractAddress && !!tokenId && !!contractPackageInfo,
  });

  return {
    ...queryData,
    isSuccess: queryData.isSuccess && isSuccess,
    isLoading: queryData.isLoading || isLoading,
  };
};
