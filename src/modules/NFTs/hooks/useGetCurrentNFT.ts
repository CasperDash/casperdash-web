import * as _ from 'lodash-es';
import { useParams } from 'react-router-dom';

import { useGetNFTs } from '@/hooks/queries/useGetNFTs';
import { useAccount } from '@/hooks/useAccount';
import { INFTInfo } from '@/services/casperdash/nft/type';

type Options = {
  onSuccess?: (data: INFTInfo[]) => void;
};

export const useGetCurrentNFT = ({ onSuccess }: Options = {}) => {
  const params = useParams();
  const { publicKey } = useAccount();

  const { data: nfts = [], isLoading } = useGetNFTs(
    {
      publicKey,
      contractAddress: params.contractAddress,
      tokenId: params.tokenId,
    },
    {
      onSuccess,
    }
  );

  return {
    nft: _.first(nfts),
    isLoading,
  };
};
