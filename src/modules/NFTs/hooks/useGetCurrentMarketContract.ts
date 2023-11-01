import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { useGetContractPackageInfo } from '@/hooks/queries/useGetContractPackageInfo';
import { getMarketContract } from '@/services/casperdash/market/nft.service';
import { ITokenContract } from '@/services/casperdash/market/type';

export const useGetCurrentMarketContract = (
  options?: UseQueryOptions<
    ITokenContract,
    unknown,
    ITokenContract,
    [string, Record<string, string | undefined>, string]
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
      },
      'contract',
    ],
    queryFn: async () => {
      if (!contractAddress || !tokenId || !contractPackageInfo) {
        throw new Error('Contract address or token id is not provided');
      }

      const result = await getMarketContract(contractPackageInfo.contract_hash);

      console.log('result: ', result);

      return result;
    },
    enabled: !!contractAddress && !!tokenId && !!contractPackageInfo,
  });

  return {
    ...queryData,
    isSuccess: queryData.isSuccess && isSuccess,
    isLoading: queryData.isLoading || isLoading,
  };
};
