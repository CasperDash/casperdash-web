import { BoxProps } from '@chakra-ui/react';

import TotalBalance from '@/components/Common/TotalBalance';
import { useGetCSPRMarketInfo } from '@/hooks/queries/useGetCSPRMarketInfo';

export type AccountBalancesProps = BoxProps;

const AccountTotalBalances = () => {
  const {
    data: { market_cap, volume_24h, circulating_supply, total_supply } = {
      market_cap: 0,
      volume_24h: 0,
      circulating_supply: 0,
      total_supply: 0,
    },
  } = useGetCSPRMarketInfo();

  return (
    <TotalBalance
      flex="1"
      marketCapValue={market_cap}
      dayVolumeValue={volume_24h}
      circulatingSupply={circulating_supply}
      totalSupply={total_supply}
    />
  );
};

export default AccountTotalBalances;
