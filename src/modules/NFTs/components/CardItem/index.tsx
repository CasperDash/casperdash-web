import { Box, Card, CardBody, Flex, Image, Text } from '@chakra-ui/react';

import NFTDefaultImg from '@/assets/img/nft-default.png';
import { INFTInfo } from '@/services/casperdash/nft/type';
import space from '@/theme/foundations/space';

type CardItemProps = {
  item: INFTInfo;
};

const CardItem = ({ item }: CardItemProps) => {
  return (
    <Card
      w={{ base: '100%', md: 'sm' }}
      transitionDuration={'200ms'}
      transitionDelay={'200ms'}
      p={8}
      boxShadow={'none'}
      cursor={'pointer'}
      borderRadius={space['6']}
      bg="panelBackground"
      shadow="panelShadow"
      _hover={{
        color: 'light',
      }}
    >
      <CardBody p={0}>
        <Box h={{ base: '200' }} w={{ base: '100%' }}>
          <Image
            src={item.image || NFTDefaultImg}
            alt="Green double couch with wooden legs"
            objectFit={'contain'}
            mt="14"
            w={'100%'}
            h={'100%'}
          />
        </Box>
        <Flex direction={'column'} alignItems="center">
          <Flex mt={{ base: '4', md: '14' }} gap="2">
            <Text fontWeight={'bold'} fontSize={'2xl'} noOfLines={1}>
              {item.nftName}
            </Text>
            <Text fontWeight={'bold'} fontSize={'2xl'} color="gray.500">
              #{item.tokenId}
            </Text>
          </Flex>
          <Text color={'gray.500'} mt="6">
            {item.contractName}
          </Text>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default CardItem;
