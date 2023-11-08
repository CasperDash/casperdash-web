import { Box, Card, CardBody, Flex, Image, Text } from '@chakra-ui/react';

import NFTDefaultImg from '@/assets/img/nft-default.png';
import { INFTInfo } from '@/services/casperdash/nft/type';
import space from '@/theme/foundations/space';

type NFTCardItemProps = {
  item: INFTInfo;
};

const NFTCardItem = ({ item }: NFTCardItemProps) => {
  return (
    <Card
      w={{ base: '100%', md: 'sm' }}
      transitionDuration={'200ms'}
      transitionDelay={'200ms'}
      p={4}
      boxShadow={'none'}
      cursor={'pointer'}
      borderRadius={space['6']}
      // bg="insetPanelBackground"
      // shadow="insetShadow"
      bg="panelBackground"
      shadow="panelShadow"
    >
      <CardBody p={0}>
        <Box
          h={{ base: '200', sm: '280' }}
          w={{ base: '100%' }}
          // bg="insetPanelBackground"
          // shadow="insetShadow"
          borderRadius={space['4']}
        >
          <Image
            h={'100%'}
            w={'100%'}
            src={item.image || NFTDefaultImg}
            alt="Green double couch with wooden legs"
            objectFit={'contain'}
          />
        </Box>
        <Flex direction={'column'} alignItems="center" rowGap={3}>
          <Flex direction={'column'} alignItems="center">
            <Text color={'gray.500'} mt="2" mb={0}>
              {item.contractName}
            </Text>
            <Text mb={0} fontWeight={'bold'} fontSize={'xl'} noOfLines={1}>
              EggForce {item.nftName}
            </Text>
          </Flex>
          <Text fontWeight={'500'} fontSize={'md'} color="gray.500">
            Token ID #{item.tokenId}
          </Text>
          {/* <Flex mt={{ base: '4', md: '14' }} gap="2">
          </Flex> */}
        </Flex>
      </CardBody>
    </Card>
  );
};

export default NFTCardItem;
