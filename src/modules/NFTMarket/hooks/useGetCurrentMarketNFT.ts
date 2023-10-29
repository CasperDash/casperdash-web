import { useParams } from 'react-router-dom';

import { useGetMarketNFT, UseGetMarketNFTOptions } from './useGetMarketNFT';

type Options = UseGetMarketNFTOptions;

export const useGetCurrentMarketNFT = (options?: Options) => {
  const params = useParams();

  return useGetMarketNFT(
    {
      tokenAddress: params.contractAddress!,
      tokenId: params.tokenId!,
    },
    options
  );
};