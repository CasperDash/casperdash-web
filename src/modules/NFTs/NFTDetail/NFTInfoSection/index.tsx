import { Box, Flex, Text } from '@chakra-ui/react';

import CancelListButton from './CancelListButton';
import ListForSaleModal from './ListForSaleModal';
import { useGetCurrentMarketNFT } from '../../hooks/useGetCurrentMarketNFT';
import { INFTInfo } from '@/services/casperdash/nft/type';

type Props = {
  nft: INFTInfo;
};

const NFTInfoSection = ({ nft }: Props) => {
  const { data: marketNFT, isLoading, refetch } = useGetCurrentMarketNFT();

  const handleOnContinue = () => {
    refetch();
  };

  return (
    <>
      <Flex direction={'column'} w="100%">
        <Flex alignItems={'center'}>
          <Text fontSize={'4xl'} fontWeight={'bold'}>
            {nft.nftName}
          </Text>
          <Text ml="2" fontSize={'4xl'} fontWeight={'bold'} color={'gray.400'}>
            #{nft.tokenId}
          </Text>
        </Flex>

        <Box
          bgColor={'gray.200'}
          borderRadius="xl"
          borderColor="gray.400"
          mt="12"
          p="4"
        >
          <Text textAlign={'center'}>This NFT is in your wallet</Text>
          {!isLoading && (
            <Box>
              {marketNFT ? (
                <CancelListButton
                  contractAddress={nft.contractAddress}
                  tokenId={nft.tokenId}
                  onContinue={handleOnContinue}
                />
              ) : (
                <ListForSaleModal onContinue={handleOnContinue} />
              )}
            </Box>
          )}
        </Box>
      </Flex>
    </>
  );
};

export default NFTInfoSection;
