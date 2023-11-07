import { Flex, Box } from '@chakra-ui/react';

import ListNFTs from './components/ListNFTs';

const NFTMarket = () => {
  return (
    <Box className="duc-test">
      <Flex alignItems={'center'} flexDir={'column'} justify={'center'}>
        <ListNFTs />
      </Flex>
    </Box>
  );
};

export default NFTMarket;
