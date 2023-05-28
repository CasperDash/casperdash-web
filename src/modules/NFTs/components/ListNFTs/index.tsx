import {
  Divider,
  Flex,
  Grid,
  GridItem,
  Image,
  Spinner,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import CardItem from '../CardItem';
import EmptyImg from '@/assets/img/empty.png';
import { PathEnum } from '@/enums';
import { INFTInfo } from '@/services/casperdash/nft/type';

type Props = {
  nfts?: INFTInfo[];
  isLoading?: boolean;
};

const ListNFTs = ({ nfts = [], isLoading = false }: Props) => {
  const navigate = useNavigate();
  const handleOnClick = (item: INFTInfo) => {
    navigate(`${PathEnum.NFT}/${item.contractAddress}/${item.tokenId}`);
  };

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
    <Grid
      templateColumns={{
        base: '1',
        lg: 'repeat(3,1fr)',
        md: 'repeat(2,1fr)',
      }}
      gap={6}
      w={'100%'}
    >
      {nfts?.map((item) => {
        return (
          <GridItem
            key={`${item.contractAddress}-${item.contractName}-${item.tokenId}`}
            onClick={() => handleOnClick(item)}
          >
            <CardItem item={item} />
            <Divider marginY={{ base: '4' }} />
          </GridItem>
        );
      })}
    </Grid>
  );
};

export default ListNFTs;
