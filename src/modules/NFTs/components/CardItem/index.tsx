import { Box, Card, CardBody, Image, Text } from '@chakra-ui/react';

import NFTDefaultImg from '@/assets/img/nft-default.png';
import { INFTInfo } from '@/services/casperdash/nft/type';

type CardItemProps = {
  item: INFTInfo;
};

const CardItem = ({ item }: CardItemProps) => {
  return (
    <Card
      w={{ base: '100%', md: 'sm' }}
      p={8}
      boxShadow={'none'}
      cursor={'pointer'}
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
        <Text fontWeight={'bold'} fontSize={'2xl'} mt={{ base: '4', md: '14' }}>
          {item.nftName}
        </Text>
        <Text color={'gray.500'} mt="6">
          {item.contractName}
        </Text>
      </CardBody>
    </Card>
  );
};

export default CardItem;
