import { useEffect } from 'react';

import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Image,
  Spinner,
} from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

import CardItem from './CardItem';
import { useFetchMarketNFTs } from '../../hooks/useFetchMarketNFTs';
import EmptyImg from '@/assets/img/empty.png';
import { PathEnum } from '@/enums';
import { IMarketNFT } from '@/services/casperdash/market/type';

const ListNFTs = () => {
  const navigate = useNavigate();
  const { ref, inView } = useInView();

  const { nfts, isLoading, isFetchingNextPage, fetchNextPage } =
    useFetchMarketNFTs({
      limit: 6,
    });

  const handleOnClick = (item: IMarketNFT) => {
    navigate(
      `${PathEnum.NFT_MARKET}/${item.tokenContractHash}/${item.tokenId}`
    );
  };

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  if (isLoading) {
    return (
      <Flex justifyContent={'center'} w="100%" mt="40">
        <Spinner />
      </Flex>
    );
  }

  if (!nfts || nfts.length === 0) {
    return (
      <Flex justifyContent={'center'} mt="40" w="160px">
        <Image src={EmptyImg} />
      </Flex>
    );
  }

  return (
    <>
      <Grid
        templateColumns={{
          base: '1',
          md: 'repeat(2,1fr)',
          lg: 'repeat(3,1fr)',
        }}
        gap={6}
        w={'100%'}
      >
        {nfts?.map((item) => {
          return (
            <>
              <GridItem key={`${item.tokenContractHash}-${item.tokenId}-1`}>
                <CardItem item={item} onClick={() => handleOnClick(item)} />
                <Divider marginY={{ base: '4' }} />
              </GridItem>
              <GridItem key={`${item.tokenContractHash}-${item.tokenId}-2`}>
                <CardItem item={item} onClick={() => handleOnClick(item)} />
                <Divider marginY={{ base: '4' }} />
              </GridItem>
              <GridItem key={`${item.tokenContractHash}-${item.tokenId}-3`}>
                <CardItem item={item} onClick={() => handleOnClick(item)} />
                <Divider marginY={{ base: '4' }} />
              </GridItem>
              <GridItem key={`${item.tokenContractHash}-${item.tokenId}-4`}>
                <CardItem item={item} onClick={() => handleOnClick(item)} />
                <Divider marginY={{ base: '4' }} />
              </GridItem>
              <GridItem key={`${item.tokenContractHash}-${item.tokenId}-5`}>
                <CardItem item={item} onClick={() => handleOnClick(item)} />
                <Divider marginY={{ base: '4' }} />
              </GridItem>
            </>
          );
        })}
      </Grid>
      <Box ref={ref}>
        {isFetchingNextPage && (
          <Flex justifyContent={'center'} w={'100%'} p="10">
            <Spinner />
          </Flex>
        )}
      </Box>
    </>
  );
};

export default ListNFTs;
