import { useCallback } from 'react';

import { HStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import StatCompact from '@/components/Common/StatCompact';
import { CSPRValue } from '@/components/Common/TokenValue';
import { useGetCSPRMarketInfo } from '@/hooks/queries/usePrice';
import { formatI18Value } from '@/utils/format';

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
    (value: number, opt = {}) => {
      return t('intlNumber', {
        val: value,
        ...opt,
      });
    },
    [t]
  );
  return (
    <HStack spacing={10} alignItems={'flex-end'}>
      <StatCompact
        label={t('circulating_supply') as string}
        value={<CSPRValue value={formatI18Value(circulating_supply)} />}
      />
      <StatCompact
        label={t('volume_24h') as string}
        value={formatValue(volume_24h)}
      />
      <StatCompact
        label={t('market_cap') as string}
        value={formatValue(market_cap)}
      />
      <StatCompact
        label={t('casper_market_price') as string}
        value={formatValue(price, {
          minimumFractionDigits: 6,
        })}
        diff={price_change_percentage_24h?.toFixed(2)}
      />
      {/* <CSPRValue value={price.toFixed(6)} diff={price_change_percentage_24h} /> */}
    </HStack>
  );
};

export default MarketHeaderStats;
