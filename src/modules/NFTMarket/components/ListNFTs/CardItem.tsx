import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Image,
  Text,
} from '@chakra-ui/react';
import { motesToCSPR } from 'casper-js-sdk';

import BuyModalButton from '../BuyModalButton';
import NFTDefaultImg from '@/assets/img/nft-default.png';
import { IMarketNFT } from '@/services/casperdash/market/type';

type CardItemProps = {
  item: IMarketNFT;
  onClick?: () => void;
};

const CardItem = ({ item, onClick }: CardItemProps) => {
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
      <CardBody p={0} onClick={onClick}>
        <Box h={{ base: '200' }} w={{ base: '100%' }}>
          <Image
            src={item?.image || NFTDefaultImg}
            alt="Green double couch with wooden legs"
            objectFit={'contain'}
            mt="14"
            w={'100%'}
            h={'100%'}
          />
        </Box>
        <Flex
          mt={{ base: '4', md: '14' }}
          justifyContent="center"
          alignItems={'center'}
        >
          <Text textAlign={'center'} fontWeight={'bold'} fontSize={'2xl'}>
            {item.metadata?.name}
          </Text>
          <Text ml="2" fontSize={'2xl'} fontWeight={'bold'} color={'gray.400'}>
            #{item.tokenId}
          </Text>
        </Flex>
        <Box mt="3">
          <Text textAlign={'center'} fontWeight={'bold'} color="gray.500">
            Price: {motesToCSPR(item.listingAmount).toNumber()} CSPR
          </Text>
        </Box>
      </CardBody>
      <CardFooter>
        <Flex mt="4" w="100%" justifyContent={'center'}>
          <BuyModalButton nft={item} w="30" variant="outline" />
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default CardItem;
