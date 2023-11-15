import {
  Divider,
  Flex,
  Grid,
  GridItem,
  Image,
  Spinner,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

// import CardItem from '../CardItem';
import EmptyImg from '@/assets/img/empty.png';
import NFTCardItem from '@/components/Common/NFTCardItem';
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
      <Flex justifyContent={'center'} mt="40">
        <Image src={EmptyImg} w="160px" />
      </Flex>
    );
  }

  return (
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
            key={`${item.contractAddress}-${item.contractName}-${item.tokenId}`}
            onClick={() => handleOnClick(item)}
          >
            <NFTCardItem item={item} />
            <Divider marginY={{ base: '4' }} />
          </GridItem>
        );
      })}
    </Grid>
  );
};

export default ListNFTs;
