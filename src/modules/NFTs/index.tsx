import { Flex } from '@chakra-ui/react';
import { Heading, Box } from '@chakra-ui/react';

import NFTFilters from './components/Filters';
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

  return (
    <Flex alignItems={'center'} flexDir={'column'} justify={'center'}>
      <Box mb={16} textAlign="left">
        <Heading>My NFTs</Heading>
      </Box>
      <Flex>
        <Flex width={'240px'} position="relative">
          <Box position={'sticky'} top="0">
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
