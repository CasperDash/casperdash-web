import { useEffect } from 'react';

import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, Button, Divider, Flex, Image, Spinner } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import NFTInfoSection from './NFTInfoSection';
import NFTInfoTabs from './NFTInfoTabs';
import { useGetCurrentMarketNFT } from '../hooks/useGetCurrentMarketNFT';
import NFTDefaultImg from '@/assets/img/nft-default.png';
import { PathEnum } from '@/enums';

const NFTMarketDetail = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: nftDetail, isLoading } = useGetCurrentMarketNFT();

  const handleOnBack = () => {
    navigate(PathEnum.NFT_MARKET);
  };

  useEffect(() => {
    if (!nftDetail && !isLoading) {
      navigate(PathEnum.NFT_MARKET);
    }
  }, [nftDetail, isLoading, navigate]);

  if (isLoading) {
    return (
      <Flex justifyContent={'center'} w="100%" mt="40">
        <Spinner />
      </Flex>
    );
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
        className="nft-market-detail--wrapper"
        direction={{ base: 'column', md: 'row' }}
        mt={{ base: '6', md: '8' }}
        gap={{ base: '16' }}
        justifyContent={{ base: 'center' }}
        w="100%"
      >
        <Box mt={{ base: '4' }} mb={{ base: 0, md: 5 }} maxW={'520px'}>
          <Image
            bg="panelBackground"
            shadow="panelShadow"
            src={nftDetail?.image || NFTDefaultImg}
            alt="NFT image"
            borderRadius="3xl"
            objectFit={'contain'}
            onError={(e) => {
              e.currentTarget.src = NFTDefaultImg;
            }}
          />
        </Box>

        <Flex
          flex="0"
          flexBasis={'md'}
          flexShrink={0}
          flexGrow={0}
          p={{ base: '4' }}
          justifyContent={'center'}
          direction="column"
        >
          <NFTInfoSection nft={nftDetail} />
          <Box mt="12">
            <NFTInfoTabs nft={nftDetail} />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default NFTMarketDetail;
