import { BoxProps } from '@chakra-ui/react';

import TotalBalance from '@/components/Common/TotalBalance';
import { useCoingeckoCoin } from '@/hooks/queries/useGetCoingeckoCoin';

export type AccountBalancesProps = BoxProps;

const AccountTotalBalances = () => {
  const {
    data: { marketCap, dailyVolume } = { marketCap: 0, dailyVolume: 0 },
  } = useCoingeckoCoin();

  return (
    <TotalBalance
      flex="1"
      marketCapValue={marketCap}
      dayVolumeValue={dailyVolume}
    />
  );
};

export default AccountTotalBalances;
