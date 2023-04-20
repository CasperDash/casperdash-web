import { useState } from 'react';

import { ArrowDownIcon, ArrowUpIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Text,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  ButtonGroup,
  Button,
  Card,
  CardBody,
  Image,
  Box,
  Divider,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { NFTDetail } from './NFTDetail';
import { useGetNFTs } from '@/hooks/queries/useGetNFTs';
import { useAccount } from '@/hooks/useAccount';
import { INFTInfo } from '@/services/casperdash/nft/type';

type TSortField = 'nftName' | 'contractName';

const NFTs = () => {
  const { publicKey } = useAccount();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sort, setSort] = useState<TSortField>('nftName');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const { t } = useTranslation();

  const { filteredData } = useGetNFTs(publicKey, searchTerm, sort, order);

  const [selectedNFT, setSelectedNFT] = useState<INFTInfo>();

  const onFilterWith = (type: TSortField) => {
    if (type !== sort) {
      setSort(type);
      setOrder('desc');
    } else {
      setOrder((currentOrder) => (currentOrder === 'asc' ? 'desc' : 'asc'));
    }
  };

  if (selectedNFT) {
    return (
      <NFTDetail
        nftDetail={selectedNFT}
        onBack={() => setSelectedNFT(undefined)}
      />
    );
  }

  return (
    <Flex
      alignItems={'center'}
      flexDir={'column'}
      justify={'center'}
      mt={{ base: '6', lg: '20' }}
    >
      <Text fontWeight="700">{t('my_collectibles')}</Text>
      <Flex
        direction={{ base: 'column', lg: 'row' }}
        width={{ base: '100%' }}
        alignItems={'center'}
        marginTop={{ base: '4', lg: '10' }}
        gap={{ base: '4', lg: '10' }}
      >
        <InputGroup>
          <Input
            placeholder={t('search_collectibles') || 'Search NFTs'}
            borderRadius={'40'}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <InputRightElement mr={'2'}>
            <SearchIcon color={'gray.400'} />
          </InputRightElement>
        </InputGroup>

        <ButtonGroup width={{ base: '100%' }}>
          <Button
            width={{ base: '50%' }}
            onClick={() => onFilterWith('nftName')}
            rightIcon={
              sort === 'nftName' && order === 'desc' ? (
                <ArrowDownIcon />
              ) : (
                <ArrowUpIcon />
              )
            }
          >
            {t('name')}
          </Button>
          <Button
            width={{ base: '50%' }}
            onClick={() => onFilterWith('contractName')}
            rightIcon={
              sort === 'contractName' && order === 'desc' ? (
                <ArrowDownIcon />
              ) : (
                <ArrowUpIcon />
              )
            }
          >
            {t('contract_name')}
          </Button>
        </ButtonGroup>
      </Flex>
      <Grid
        templateColumns={{
          base: '1',
          lg: 'repeat(3,1fr)',
          md: 'repeat(2,1fr)',
        }}
        gap={6}
        w={'100%'}
      >
        {filteredData?.map((item) => {
          return (
            <GridItem
              key={`${item.contractAddress}-${item.contractName}-${item.tokenId}`}
              onClick={() => setSelectedNFT(item)}
            >
              <Card mt={{ base: 4 }} w={{ base: '100%' }} p={4}>
                <CardBody p={0}>
                  <Box h={{ base: '200' }} w={{ base: '100%' }}>
                    <Image
                      src={item.image}
                      alt="Green double couch with wooden legs"
                      borderRadius="3xl"
                      objectFit={'contain'}
                      w={'100%'}
                      h={'100%'}
                    />
                  </Box>
                  <Text fontWeight={'bold'} fontSize={'2xl'} mt={{ base: '4' }}>
                    {item.nftName}
                  </Text>
                  <Text color={'gray.500'}>{item.contractName}</Text>
                </CardBody>
              </Card>
              <Divider marginY={{ base: '4' }} />
            </GridItem>
          );
        })}
      </Grid>
    </Flex>
  );
};

export default NFTs;
