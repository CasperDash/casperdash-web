import NFTFilters from './components/Filters';
import ListNFTs from './components/ListNFTs';
import NFTListingLayout from '@/components/Layouts/NFTListingLayout';

const NFTMarket = () => {
  return (
    <NFTListingLayout title="Market" filters={<NFTFilters />}>
      <ListNFTs />
    </NFTListingLayout>
  );
};

export default NFTMarket;
