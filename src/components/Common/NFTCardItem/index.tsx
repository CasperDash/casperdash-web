import { WarningIcon } from '@chakra-ui/icons';
import {
  Box,
  Card,
  CardBody,
  Flex,
  HStack,
  Image,
  Text,
  Icon,
  VStack,
} from '@chakra-ui/react';
import { AiOutlineShop } from 'react-icons/ai';

import NFTDefaultImg from '@/assets/img/nft-default.png';
import { INFTInfo } from '@/services/casperdash/nft/type';
import space from '@/theme/foundations/space';

type NFTCardItemProps = {
  item: INFTInfo;
};

const NFTCardItem = ({ item }: NFTCardItemProps) => {
  const { isTransfarable = false, status = '' } = item;
  return (
    <Card
      w={{ base: '100%', md: 'sm' }}
      transitionDuration={'200ms'}
      transitionDelay={'200ms'}
      p={4}
      boxShadow={'none'}
      cursor={'pointer'}
      borderRadius={space['6']}
      bg="panelBackground"
      shadow="panelShadow"
    >
      <CardBody p={0} position="relative">
        <Box position={'absolute'} left={2} top={2}>
          {!isTransfarable && (
            <VStack alignItems={'flex-end'}>
              <HStack bgColor="blackAlpha.300" p={1} px={3} borderRadius="16px">
                <WarningIcon boxSize={4} />
                <Text fontSize={'sm'}>Cannot transfer</Text>
              </HStack>
            </VStack>
          )}
        </Box>
        <Box position={'absolute'} right={2} top={2}>
          <VStack alignItems={'flex-end'}>
            <HStack bgColor="blackAlpha.300" p={1} px={3} borderRadius="16px">
              <WarningIcon boxSize={4} />
              <Text fontSize={'sm'}>Cannot list</Text>
            </HStack>
            {status === 'listing' && (
              <HStack
                bgColor="green.200"
                color="green.900"
                fontWeight={400}
                p={1}
                px={3}
                borderRadius="16px"
              >
                <Icon as={AiOutlineShop} boxSize={4} />
                <Text fontSize={'sm'}>Listing</Text>
              </HStack>
            )}
          </VStack>
        </Box>
        <Box
          h={{ base: '200', sm: '280' }}
          w={{ base: '100%' }}
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
              {item.nftName}
            </Text>
          </Flex>
          <Text fontWeight={'500'} fontSize={'md'} color="gray.500">
            Token ID #{item.tokenId}
          </Text>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default NFTCardItem;
