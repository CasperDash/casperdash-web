import { useCallback } from 'react';

import { HStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import StatCompact from '@/components/Common/StatCompact';
import { CSPRValue } from '@/components/Common/TokenValue';
import { useGetCSPRMarketInfo } from '@/hooks/queries/usePrice';

const MarketHeaderStats = () => {
  const { t } = useTranslation();
  const {
    data: {
      price,
      price_change_percentage_24h,
      market_cap,
      volume_24h,
      circulating_supply,
    } = {
      price: 0,
      price_change_percentage_24h: 0,
      market_cap: 0,
      volume_24h: 0,
      circulating_supply: 0,
      total_supply: 0,
    },
  } = useGetCSPRMarketInfo();

  const formatValue = useCallback(
    (value: any) => {
      return t('intlNumber', {
        val: value,
      });
    },
    [t]
  );
  return (
    <HStack spacing={10} alignItems={'flex-end'}>
      <StatCompact
        label="Circulating Supply"
        value={`${new Intl.NumberFormat().format(circulating_supply)} CSPR`}
      />
      <StatCompact label="Volume (24H)" value={formatValue(volume_24h)} />
      <StatCompact
        label="Market Cap"
        value={formatValue(market_cap)}
        // diff="23.76"
      />
      <CSPRValue value={price.toFixed(6)} diff={price_change_percentage_24h} />
    </HStack>
  );
};

export default MarketHeaderStats;
