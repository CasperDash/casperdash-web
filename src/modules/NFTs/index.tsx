import ListNFTs from './components/ListNFTs';
import { useGetNFTs } from '@/hooks/queries/useGetNFTs';
import { useAccount } from '@/hooks/useAccount';

const NFTs = () => {
  const { publicKey } = useAccount();

  const { data: nfts, isLoading } = useGetNFTs({
    publicKey,
    sortBy: 'nftName',
    order: 'asc',
  });
  return <ListNFTs nfts={nfts} isLoading={isLoading} />;
};

export default NFTs;
