import { useState } from 'react';

import { ArrowDownIcon, ArrowUpIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  ButtonGroup,
  Button,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import ListNFTs from './components/ListNFTs';
import { useGetNFTs } from '@/hooks/queries/useGetNFTs';
import { useAccount } from '@/hooks/useAccount';

type TSortField = 'nftName' | 'contractName';

const NFTs = () => {
  const { publicKey } = useAccount();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sort, setSort] = useState<TSortField>('nftName');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const { t } = useTranslation();

  const { data: nfts, isLoading } = useGetNFTs({
    publicKey,
    searchName: searchTerm,
    sortBy: sort,
    order,
  });

  const onFilterWith = (type: TSortField) => {
    if (type !== sort) {
      setSort(type);
      setOrder('desc');
    } else {
      setOrder((currentOrder) => (currentOrder === 'asc' ? 'desc' : 'asc'));
    }
  };

  return (
    <Flex
      alignItems={'center'}
      flexDir={'column'}
      justify={'center'}
      mt={{ base: '6', lg: '20' }}
    >
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
            _focus={{
              outline: 'none',
              boxShadow: 'none',
            }}
          />
          <InputRightElement mr={'2'} mt={'1'}>
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
      <ListNFTs nfts={nfts} isLoading={isLoading} />
    </Flex>
  );
};

export default NFTs;
