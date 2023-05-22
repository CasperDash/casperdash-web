import { Text } from '@chakra-ui/react';
import Big from 'big.js';
import { useTranslation } from 'react-i18next';

import { useGetCoinMarketData } from '@/hooks/queries/useGetCoinMarketData';
import { Token } from '@/services/friendlyMarket/tokens';

type PriceProps = {
  value?: Token;
};

const Price = ({ value }: PriceProps) => {
  const { t } = useTranslation();
  const { data = { price: 0, amount: 0 } } = useGetCoinMarketData(
    value?.coingeckoId
  );
  const amountInUsd = Big(data.price || 0)
    .times(value?.amount || 0)
    .round(8)
    .toNumber();

  return (
    <Text fontSize="sm" color="gray.500" ml="auto">
      {t('price')}: {amountInUsd || 0}
    </Text>
  );
};

export default Price;
