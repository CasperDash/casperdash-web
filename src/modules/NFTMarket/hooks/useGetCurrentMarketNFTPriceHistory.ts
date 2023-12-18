import { useParams } from 'react-router-dom';

import {
  useGetMarketNFTPriceHistory,
  UseGetMarketNFTOptions,
} from '@/hooks/queries/useGetMarketNFTPriceHistory';

type Options = UseGetMarketNFTOptions;

export const useGetCurrentMarketNFTPriceHistory = (options?: Options) => {
  const params = useParams();

  return useGetMarketNFTPriceHistory(
    {
      tokenPackageHash: params.contractAddress!,
      tokenId: params.tokenId!,
    },
    options
  );
};
