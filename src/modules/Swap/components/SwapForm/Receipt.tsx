import { ReactNode } from 'react';

import { Flex, Text, VStack } from '@chakra-ui/react';
import Big from 'big.js';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import RoutePaths from './RoutePaths';
import { useCalculateAmountOutMin } from '@/modules/Swap/hooks/useCalculateAmountOutMin';
import { useGetCurrentAMMPair } from '@/modules/Swap/hooks/useGetCurrentAMMPair';
import { useGetSwapSettings } from '@/modules/Swap/hooks/useGetSwapSettings';
import { useSelectToken } from '@/modules/Swap/hooks/useSelectToken';
import { PairRouteData } from '@/services/friendlyMarket/amm/type';
import { Token } from '@/services/friendlyMarket/tokens';

const Row = ({ label, value }: { label: string; value: ReactNode }) => {
  return (
    <Flex justifyContent="space-between" w="100%">
      <Text>{label}</Text>
      <Text>{value}</Text>
    </Flex>
  );
};

const Receipt = () => {
  const { setValue } = useFormContext();
  const { t } = useTranslation();
  const swapFrom: Token = useSelectToken('swapFrom');
  const swapTo: Token = useSelectToken('swapTo');
  const { data: swapSettings = { slippage: 0 } } = useGetSwapSettings({
    onSuccess: (data) => {
      setValue('swapSettings', data);
    },
  });
  const { data: pair } = useGetCurrentAMMPair({
    onSuccess: (data) => {
      setValue('pair', data);
    },
  });
  const amountOutMin = useCalculateAmountOutMin();

  const fee = Big(swapFrom.amount || 0)
    .times(0.3)
    .div(100)
    .round(swapFrom.decimals, 0)
    .toNumber();
  const priceImpact = swapTo.amountInUSD
    ? Big(100)
        .minus(
          Big(swapFrom.amountInUSD || 0)
            .div(swapTo.amountInUSD || 1)
            .times(100)
        )
        .round(4, 0)
        .toNumber()
    : 0;
  const rate =
    swapTo.amount && swapTo.amount > 0
      ? Big(swapTo.amount || 0)
          .div(Big(swapFrom.amount || 1))
          .toFixed(8, 0)
      : 0;

  if (!pair) {
    return null;
  }

  const items: { label: string; value: ReactNode }[] = [
    {
      label: t('rate'),
      value: `1 ${swapFrom.symbol} ~ ${
        swapTo.amount && swapTo.amount > 0 ? rate : 0
      } ${swapTo.symbol}`,
    },
    {
      label: t('fee'),
      value: `${fee} ${swapFrom.symbol}`,
    },
    {
      label: t('price_impact'),
      value: `${Math.min(Math.abs(priceImpact), 99.7)}%`,
    },
    {
      label: t('minimum'),
      value: `At least ${Big(amountOutMin).toFixed(8, 0)}`,
    },
    {
      label: t('slippage'),
      value: `${swapSettings.slippage}%`,
    },
  ];
  const pairRoute = pair as PairRouteData;

  if (pairRoute.isUsingRouting) {
    items.push({
      label: t('route'),
      value: <RoutePaths />,
    });
  }

  return (
    <VStack
      gap="1"
      alignItems="baseline"
      mt="2"
      px="10"
      py="4"
      // border="1px solid"
      // borderColor="gray.200"
      // borderRadius="md"
    >
      {items.map((item) => {
        return (
          <Row
            key={`receipt-${item.label}`}
            label={item.label}
            value={item.value}
          />
        );
      })}
    </VStack>
  );
};

export default Receipt;
