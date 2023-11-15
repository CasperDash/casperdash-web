import { useParams } from 'react-router-dom';

import {
  useGetMarketNFT,
  UseGetMarketNFTOptions,
} from '@/hooks/queries/useGetMarketNFT';

type Options = UseGetMarketNFTOptions;

export const useGetCurrentMarketNFT = (options?: Options) => {
  const { tokenId, contractAddress } = useParams();

  const queryData = useGetMarketNFT(
    {
      tokenPackageHash: contractAddress,
      tokenId: tokenId,
    },
    {
      ...options,
    }
  );

  return {
    ...queryData,
  };
};
