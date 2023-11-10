import { Stack, Flex, Text } from '@chakra-ui/react';
import Big from 'big.js';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useGetCurrentMarketContract } from '../../hooks/useGetCurrentMarketContract';
import { Config } from '@/config';
import { AssetNamesEnum } from '@/enums/assetNames';

const ReceiveWidget = () => {
  const { t } = useTranslation();
  const { control } = useFormContext();
  const price = useWatch({
    control,
    name: 'price',
  });
  const { data = null } = useGetCurrentMarketContract();

  const bigPlatformFee = Big(price || 0)
    .times(Config.marketPlatformFeePercent)
    .div(100);
  const bigRoyaltyFee = Big(price || 0).times(
    Big(data?.royaltyFee || 0).div(100)
  );

  const receiveAmount = price
    ? Big(price).minus(bigRoyaltyFee).minus(bigPlatformFee).toFixed(4)
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
        <Text mt="4">
          {t('royalty_fee')} (
          {t('intlAssetNumber', {
            asset: '%',
            val: data?.royaltyFee,
          })}
          )
        </Text>
        <Text>
          {t('intlAssetNumber', {
            asset: AssetNamesEnum.CSPR,
            val: bigRoyaltyFee.toFixed(4),
          })}
        </Text>
      </Flex>
      <Flex justifyContent={'space-between'} alignItems="center">
        <Text mt="4">
          {t('platform_fee')} (
          {t('intlAssetNumber', {
            asset: '%',
            val: Config.marketPlatformFeePercent,
          })}
          )
        </Text>
        <Text>
          {t('intlAssetNumber', {
            asset: AssetNamesEnum.CSPR,
            val: bigPlatformFee.toFixed(4),
            number: 4,
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
            asset: AssetNamesEnum.CSPR,
            val: receiveAmount,
          })}
        </Text>
      </Flex>
    </Stack>
  );
};

export default ReceiveWidget;
