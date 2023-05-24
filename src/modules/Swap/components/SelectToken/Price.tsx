import { Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { useGetAmountInUsd } from '@/modules/Swap/hooks/useGetAmountInUsd';
import { Token } from '@/services/friendlyMarket/tokens';

type PriceProps = {
  value?: Token;
};

const Price = ({ value }: PriceProps) => {
  const { t } = useTranslation();
  const amountInUsd = useGetAmountInUsd({ token: value });
  return (
    <Text fontSize="sm" color="gray.500" ml="auto">
      {t('price')}: ${amountInUsd || 0}
    </Text>
  );
};

export default Price;
