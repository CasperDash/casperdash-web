import { Flex } from '@chakra-ui/react';
import { Heading, Box } from '@chakra-ui/react';

import NFTFilters from './components/Filters';
import ListNFTs from './components/ListNFTs';
import { useGetNFTs } from '@/hooks/queries/useGetNFTs';
import { useAccount } from '@/hooks/useAccount';
import space from '@/theme/foundations/space';

const NFTs = () => {
  const { publicKey } = useAccount();

  const { data: nfts, isLoading } = useGetNFTs({
    publicKey,
    sortBy: 'nftName',
    order: 'asc',
  });

  return (
    <Flex alignItems={'center'} flexDir={'column'} justify={'center'}>
      <Box mb={16} textAlign="left">
        <Heading>My NFTs</Heading>
      </Box>
      <Flex columnGap={space['6']}>
        <Flex width={'280px'} position="relative">
          <Box
            width="full"
            position={'sticky'}
            top={145}
            alignSelf={'flex-start'}
          >
            <NFTFilters />
          </Box>
        </Flex>
        <Flex>
          <ListNFTs nfts={nfts} isLoading={isLoading} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default NFTs;
