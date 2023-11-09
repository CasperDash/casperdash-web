import {
  Box,
  Card,
  CardBody,
  Flex,
  Image,
  Text,
  IconButton,
} from '@chakra-ui/react';
import { PiShoppingCart } from 'react-icons/pi';

import NFTDefaultImg from '@/assets/img/nft-default.png';
// import BuyModalButton from '@/modules/NFTMarket/components/BuyModalButton';
import { INFTInfo } from '@/services/casperdash/nft/type';
import space from '@/theme/foundations/space';

type NFTCardItemProps = {
  item: INFTInfo;
  isMarketPage?: boolean;
};

const NFTCardItem = ({ item, isMarketPage = false }: NFTCardItemProps) => {
  return (
    <Card
      w={{ base: '100%' }}
      maxWidth={'sm'}
      transitionDuration={'200ms'}
      transitionDelay={'200ms'}
      p={4}
      cursor={'pointer'}
      borderRadius={space['6']}
      bg="panelBackground"
      shadow="panelShadow"
    >
      <CardBody p={0} position="relative">
        {/* <Box position={'absolute'} left={2} top={2}>
          {!isMarketPage && !isTransfarable && (
            <VStack alignItems={'flex-end'}>
              <HStack
                color="blackAlpha.700"
                bgColor="blackAlpha.300"
                p={1}
                px={3}
                borderRadius="16px"
              >
                <WarningIcon boxSize={4} />
                <Text fontSize={'sm'}>Cannot transfer</Text>
              </HStack>
            </VStack>
          )}
        </Box> */}
        <Box position={'absolute'} right={2} top={2}>
          {/* <VStack alignItems={'flex-end'}>
            {!isMarketPage && (
              <HStack
                bgColor="blackAlpha.300"
                p={1}
                px={3}
                borderRadius="16px"
                color="blackAlpha.700"
              >
                <WarningIcon boxSize={4} />
                <Text fontSize={'sm'}>Cannot list</Text>
              </HStack>
            )}
            {!isMarketPage && status === 'listing' && (
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
          </VStack> */}
        </Box>
        <Box
          h={{ base: '240', sm: '320' }}
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
        {isMarketPage && (
          <Flex
            mt="6"
            // bg="insetPanelBackground02"
            bg="whiteAlpha.300"
            shadow="insetShadow"
            padding={4}
            borderRadius="md"
          >
            {/* <StatCompact
              label="Price"
              value={
                <CSPRValue value={formatI18Value(toCSPR(item.listingAmount))} />
              }
            /> */}
            <IconButton
              ml="auto"
              isRound={true}
              variant="solid"
              aria-label="Done"
              w="46px"
              h="46px"
              fontSize="24px"
              shadow="shadow01"
              _hover={{
                bgColor: 'red.500',
                color: 'white',
              }}
              icon={<PiShoppingCart />}
            />
          </Flex>
        )}
      </CardBody>
    </Card>
  );
};

export default NFTCardItem;
