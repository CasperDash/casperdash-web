import { useParams } from 'react-router-dom';

import {
  useGetMarketNFT,
  UseGetMarketNFTOptions,
} from '../../../hooks/queries/useGetMarketNFT';

type Options = UseGetMarketNFTOptions;

export const useGetCurrentMarketNFT = (options?: Options) => {
  const params = useParams();

  return useGetMarketNFT(
    {
      tokenPackageHash: params.contractAddress!,
      tokenId: params.tokenId!,
    },
    options
  );
};
