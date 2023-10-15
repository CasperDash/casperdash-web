import { Flex, Box } from '@chakra-ui/react';

import ListNFTs from './components/ListNFTs';

const NFTMarket = () => {
  return (
    <Box mt={{ base: '6', lg: '20' }}>
      <Flex alignItems={'center'} flexDir={'column'} justify={'center'}>
        <ListNFTs />
      </Flex>
    </Box>
  );
};

export default NFTMarket;
