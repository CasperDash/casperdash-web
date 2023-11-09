import NFTFilters from './components/Filters';
import ListNFTs from './components/ListNFTs';
import NFTListingLayout from '@/components/Layouts/NFTListingLayout';
import { useGetNFTs } from '@/hooks/queries/useGetNFTs';
import { useAccount } from '@/hooks/useAccount';

const NFTs = () => {
  const { publicKey } = useAccount();

  const { data: nfts, isLoading } = useGetNFTs({
    publicKey,
    sortBy: 'nftName',
    order: 'asc',
  });
  return (
    <NFTListingLayout title="My NFTs" filters={<NFTFilters />}>
      <ListNFTs nfts={nfts} isLoading={isLoading} />
    </NFTListingLayout>
  );
};

export default NFTs;
