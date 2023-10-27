import { Stack, Flex, Text } from '@chakra-ui/react';
import Big from 'big.js';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useGetCurrentMarketContract } from '../../hooks/useGetCurrentMarketContract';
import { Config } from '@/config';

const ReceiveWidget = () => {
  const { t } = useTranslation();
  const { control } = useFormContext();
  const price = useWatch({
    control,
    name: 'price',
  });
  const { data = { royaltyFee: 0 } } = useGetCurrentMarketContract();

  const bigPlatformFee = price
    ? Big(price).times(Config.marketPlatformFeePercent).div(100)
    : 0;

  const receiveAmount =
    price && data?.royaltyFee
      ? Big(price)
          .minus(Big(price).times(Big(data.royaltyFee).div(100)))
          .minus(bigPlatformFee)
          .toFixed(4)
      : 0;

  console.log('price: ', price);

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
            val: data.royaltyFee,
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
