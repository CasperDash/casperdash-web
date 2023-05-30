import { ArrowBackIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Image,
  Spinner,
  Text,
} from '@chakra-ui/react';
import * as _ from 'lodash-es';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import CardAttirbute from '../components/CardAttribute';
import NFTDefaultImg from '@/assets/img/nft-default.png';
import MiddleTruncatedText from '@/components/Common/MiddleTruncatedText';
import { PathEnum } from '@/enums';
import { useGetNFTs } from '@/hooks/queries/useGetNFTs';
import { useAccount } from '@/hooks/useAccount';
import { INFTInfo } from '@/services/casperdash/nft/type';

const NFTDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { publicKey } = useAccount();
  const { data: nfts = [], isLoading } = useGetNFTs(
    {
      publicKey,
      contractAddress: params.contractAddress,
      tokenId: params.tokenId,
    },
    {
      onSuccess: (data: INFTInfo[]) => {
        if (!data || data.length === 0) {
          navigate(PathEnum.NFT);
        }
      },
    }
  );

  const handleOnBack = () => {
    navigate(PathEnum.NFT);
  };

  if (isLoading) {
    return (
      <Flex justifyContent={'center'} w="100%" mt="40">
        <Spinner />
      </Flex>
    );
  }

  const nftDetail = _.first<INFTInfo>(nfts);
  if (!nftDetail) {
    return null;
  }

  return (
    <Flex mt={{ base: 4 }} direction={{ base: 'column' }}>
      <Button
        leftIcon={<ArrowBackIcon />}
        variant={'outline'}
        w={{ base: '28' }}
        onClick={handleOnBack}
      >
        {t('back')}
      </Button>
      <Divider mt={{ base: '4' }} />
      <Flex
        direction={{ base: 'column', md: 'row' }}
        mt={{ base: '6', md: '8' }}
        gap={{ base: '4' }}
        justifyContent={{ base: 'center', md: 'space-between' }}
        w="100%"
      >
        <Box
          h={{ base: '200', md: '400' }}
          w={{ base: '100%', md: '80%' }}
          mt={{ base: '4' }}
          mb={{ base: 0, md: 5 }}
          flex="1 1 0"
        >
          <Image
            src={nftDetail.image || NFTDefaultImg}
            alt="NFT image"
            borderRadius="3xl"
            objectFit={'contain'}
            w={'100%'}
            h={'100%'}
          />
        </Box>
        {/* <Divider /> */}

        {/* <Text color={'gray.400'}>{nftDetail.}</Text> */}
        <Flex flex="1 1 0" p={{ base: '4' }} justifyContent={'center'}>
          <Flex direction={'column'}>
            <Flex alignItems={'center'}>
              <Text fontSize={'4xl'} fontWeight={'bold'}>
                {nftDetail.nftName}
              </Text>
              <Text
                ml="2"
                fontSize={'4xl'}
                fontWeight={'bold'}
                color={'gray.400'}
              >
                #{nftDetail.tokenId}
              </Text>
            </Flex>
            <Box mt="6">
              <Text fontSize={'xl'} fontWeight={'bold'}>
                {t('description')}
              </Text>
              <Divider mt="2" />
            </Box>
            <Box mt="6">
              <Text fontSize={'xl'} fontWeight={'bold'}>
                {t('details')}
              </Text>
              <Divider mt="2" />
              <Flex direction="column" gap="4" w="100%" mt="2">
                {!!nftDetail.totalSupply && (
                  <Flex>
                    <Text mr="1">{t('total_supply')}:</Text>
                    <Text>{parseInt(nftDetail.totalSupply?.hex)}</Text>
                  </Flex>
                )}
                {!!nftDetail.contractName && (
                  <Flex>
                    <Text mr="1">{t('contract_name')}:</Text>
                    <Text>{nftDetail.contractName}</Text>
                  </Flex>
                )}
                {!!nftDetail.contractAddress && (
                  <Flex>
                    <Text mr="1">{t('contract_address')}: </Text>
                    <MiddleTruncatedText
                      value={nftDetail.contractAddress}
                      startLength={4}
                      endLength={6}
                    />
                  </Flex>
                )}
              </Flex>
            </Box>
            <Flex
              direction={'column'}
              alignSelf={{ base: 'flex-start' }}
              w={{ base: '100%' }}
              mt={'6'}
            >
              <Text fontSize={'xl'} fontWeight={'bold'} mb={{ base: '2' }}>
                {t('attributes')}
              </Text>
              <Divider />
              <Grid
                mt="4"
                gridTemplateColumns={{
                  base: '1',
                  lg: 'repeat(4,1fr)',
                  md: 'repeat(2,1fr)',
                }}
                width={{ base: '100%' }}
                gap={{ base: '2' }}
              >
                {nftDetail.metadata?.map((item) => (
                  <CardAttirbute
                    key={`${item.key}-${item.value}`}
                    attribute={item.key || item.name}
                    value={item.value}
                  />
                ))}
              </Grid>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default NFTDetail;
