import { useParams } from 'react-router-dom';

import {
  useGetMarketNFT,
  UseGetMarketNFTOptions,
} from '@/hooks/queries/useGetMarketNFT';

type Options = UseGetMarketNFTOptions;

type Params = {
  tokenAddress: string;
};

export const useGetCurrentMarketNFT = (
  { tokenAddress }: Params,
  options?: Options
) => {
  const { tokenId } = useParams();

  const queryData = useGetMarketNFT(
    {
      tokenAddress: tokenAddress,
      tokenId: tokenId!,
    },
    {
      ...options,
      enabled: !!tokenAddress && !!tokenId,
    }
  );

  return {
    ...queryData,
  };
};
