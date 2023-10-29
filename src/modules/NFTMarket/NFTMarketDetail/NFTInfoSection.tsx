import { Box, Flex, Tag, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import BuyModalButton from '../components/BuyModalButton';
import { GradientAvatar } from '@/components/Common/GradientAvatar';
import MiddleTruncatedText from '@/components/Common/MiddleTruncatedText';
import { useGetMarketContract } from '@/hooks/queries/useGetMarketContract';
import { useCalculateCSPRToFiat } from '@/hooks/useCalculateCSPRToFiat';
import { IMarketNFT } from '@/services/casperdash/market/type';
import { toCSPR } from '@/utils/currency';

type Props = {
  nft?: IMarketNFT;
};

const NFTInfoSection = ({ nft }: Props) => {
  const { contractAddress } = useParams();
  const { t } = useTranslation();

  const { data, isLoading: isLoadingContract } = useGetMarketContract({
    tokenAddress: contractAddress!,
  });

  const totalCSPR = toCSPR(nft?.listingAmount || 0);

  const { totalFiat, isLoading } = useCalculateCSPRToFiat(totalCSPR);

  return (
    <>
      <Flex direction={'column'} w="100%">
        <Flex alignItems={'center'}>
          <Text fontSize={'4xl'} fontWeight={'bold'}>
            {nft?.metadata?.name}
          </Text>
          <Text ml="2" fontSize={'4xl'} fontWeight={'bold'} color={'gray.400'}>
            #{nft?.tokenId}
          </Text>
        </Flex>
        <Flex mt="4" gap="2">
          <Text>{t('royalties')}</Text>
          <Tag variant="solid" colorScheme="yellow">
            {data?.royaltyFee}%
          </Tag>
        </Flex>
        <Flex mt="4">
          <Box>
            <GradientAvatar name={nft?.sellerAccountHash || ''} size={40} />
          </Box>
          <Box ml="2">
            <Text color="gray">Current owner</Text>
            <MiddleTruncatedText value={nft?.sellerAccountHash} endLength={8} />
          </Box>
        </Flex>
        <Box
          bgColor={'gray.200'}
          borderRadius="xl"
          borderColor="gray.400"
          mt="12"
          p="4"
        >
          <Box>
            <Text fontWeight={'medium'} color="gray">
              {t('price')}
            </Text>
            <Text fontSize={'xl'} fontWeight={'bold'}>
              {t('intlAssetNumber', {
                val: totalCSPR,
                asset: 'CSPR',
              })}
            </Text>
            <Text fontSize="sm">
              {isLoading
                ? '...'
                : t('intlCurrencyNumber', {
                    val: totalFiat.toFixed(8),
                    currency: '$',
                  })}
            </Text>
          </Box>
          <Box>
            <BuyModalButton
              nft={nft}
              royaltyFee={data?.royaltyFee}
              isLoading={isLoadingContract}
              variant="primary"
              mt="4"
              w="100%"
            />
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default NFTInfoSection;