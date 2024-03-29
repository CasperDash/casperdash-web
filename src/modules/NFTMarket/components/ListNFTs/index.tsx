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

import { useFetchMarketNFTs } from '../../hooks/useFetchMarketNFTs';
import EmptyImg from '@/assets/img/empty.png';
import NFTCardItem from '@/components/Common/NFTCardItem';
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
    navigate(`${PathEnum.NFT_MARKET}/${item.tokenPackageHash}/${item.tokenId}`);
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
      <Flex justifyContent={'center'} mt="40">
        <Image src={EmptyImg} w="160px" />
      </Flex>
    );
  }

  return (
    <>
      <Grid
        templateColumns={{
          base: '1',
          sm: 'repeat(2,1fr)',
          md: 'repeat(2,1fr)',
          lg: 'repeat(3,1fr)',
          xl: 'repeat(4,1fr)',
          '2xl': 'repeat(4,1fr)',
        }}
        gap={6}
        w={'100%'}
      >
        {nfts?.map((item) => {
          return (
            <GridItem
              key={`${item.tokenPackageHash}-${item.tokenId}`}
              onClick={() => handleOnClick(item)}
            >
              <NFTCardItem isMarketPage item={item} />
              <Divider marginY={{ base: '4' }} />
            </GridItem>
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
