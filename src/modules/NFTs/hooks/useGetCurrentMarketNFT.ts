import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { useGetContractPackageInfo } from '@/hooks/queries/useGetContractPackageInfo';
import { getMarketContractAndItemInfo } from '@/services/casperdash/market/nft.service';
import { IMarketContractAndItem } from '@/services/casperdash/market/type';

export const useGetCurrentMarketContractAndItem = (
  options?: UseQueryOptions<
    IMarketContractAndItem,
    unknown,
    IMarketContractAndItem,
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
        tokenId,
      },
      'info',
    ],
    queryFn: async () => {
      if (!contractAddress || !tokenId || !contractPackageInfo) {
        throw new Error('Contract address or token id is not provided');
      }

      const result = await getMarketContractAndItemInfo(
        contractPackageInfo.contract_hash,
        tokenId
      );

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
