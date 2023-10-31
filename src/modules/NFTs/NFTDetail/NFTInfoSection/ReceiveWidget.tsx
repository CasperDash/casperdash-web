import { Stack, Flex, Text } from '@chakra-ui/react';
import Big from 'big.js';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useGetCurrentMarketContractAndItem } from '../../hooks/useGetCurrentMarketNFT';
import { Config } from '@/config';

const ReceiveWidget = () => {
  const { t } = useTranslation();
  const { control } = useFormContext();
  const price = useWatch({
    control,
    name: 'price',
  });
  const { data = { contract: null, item: null } } =
    useGetCurrentMarketContractAndItem();

  const bigPlatformFee = price
    ? Big(price).times(Config.marketPlatformFeePercent).div(100)
    : 0;

  const receiveAmount =
    price && data?.contract?.royaltyFee
      ? Big(price)
          .minus(Big(price).times(Big(data?.contract?.royaltyFee).div(100)))
          .minus(bigPlatformFee)
          .toFixed(4)
      : 0;

  return (
    <Stack
      mt="6"
      borderRadius={'2xl'}
      border={'1px'}
      borderColor={'gray.200'}
      bgColor={'gray.200'}
      p="4"
    >
      <Flex justifyContent={'space-between'} alignItems="center">
        <Text mt="4">{t('price')}</Text>
        <Text>
          {t('intlAssetNumber', {
            asset: 'CSPR',
            val: price || 0,
          })}
        </Text>
      </Flex>
      <Flex justifyContent={'space-between'} alignItems="center">
        <Text mt="4">{t('royalty_fee')}</Text>
        <Text>
          {t('intlAssetNumber', {
            asset: '%',
            val: data?.contract?.royaltyFee,
          })}
        </Text>
      </Flex>
      <Flex justifyContent={'space-between'} alignItems="center">
        <Text mt="4">{t('platform_fee')}</Text>
        <Text>
          {t('intlAssetNumber', {
            asset: '%',
            val: Config.marketPlatformFeePercent,
          })}
        </Text>
      </Flex>
      <Flex
        mt="4"
        borderTop={'1px'}
        borderColor={'gray.300'}
        justifyContent={'space-between'}
        alignItems="center"
        pt="7"
      >
        <Text>{t('you_will_receive')}</Text>
        <Text>
          {t('intlAssetNumber', {
            asset: 'CSPR',
            val: receiveAmount,
          })}
        </Text>
      </Flex>
    </Stack>
  );
};

export default ReceiveWidget;
