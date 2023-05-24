import { Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { useAccount } from '@/hooks/useAccount';
import { useGetSwapTokenBalance } from '@/modules/Swap/hooks/useGetSwapTokenBalance';
import { Token } from '@/services/friendlyMarket/tokens';

type BalanceProps = {
  value?: Token;
};

const Balance = ({ value }: BalanceProps) => {
  const { publicKey } = useAccount();

  const { data } = useGetSwapTokenBalance({
    ...value,
    publicKey,
  });
  const { t } = useTranslation();

  return (
    <Text fontSize="sm" color="gray.500">
      {t('balance')}: {data?.balance || 0}
    </Text>
  );
};

export default Balance;
