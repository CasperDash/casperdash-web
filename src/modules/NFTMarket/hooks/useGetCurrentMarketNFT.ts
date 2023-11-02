import { useParams } from 'react-router-dom';

import {
  useGetMarketNFT,
  UseGetMarketNFTOptions,
} from '@/hooks/queries/useGetMarketNFT';

type Options = UseGetMarketNFTOptions;

export const useGetCurrentMarketNFT = (options?: Options) => {
  const params = useParams();

  return useGetMarketNFT(
    {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      tokenPackageHash: params.contractAddress!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      tokenId: params.tokenId!,
    },
    options
  );
};
