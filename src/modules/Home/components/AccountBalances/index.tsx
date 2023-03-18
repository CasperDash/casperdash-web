import { Box, BoxProps, Button, Flex } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import TotalBalance from '@/components/Common/TotalBalance';
import TextLight from '@/components/Typography/TextLight';
import ChartCSPRPrice from '@/modules/core/ChartCSPRPrice';

export type AccountBalancesProps = BoxProps;

const AccountBalances = (props: AccountBalancesProps) => {
  const { t } = useTranslation();

  return (
    <Box {...props}>
      <Flex mb="2" alignItems="center" justifyContent="space-between">
        <Box ml="8">
          <TextLight>{t('account_balances')}</TextLight>
        </Box>
        <Flex gap="2">
          <Button variant="light" w="30">
            {t('send')}
          </Button>
          <Button variant="light" w="30">
            {t('swap')}
          </Button>
          <Button variant="light" w="30">
            {t('staking')}
          </Button>
          <Button variant="light" w="30">
            {t('receive')}
          </Button>
        </Flex>
      </Flex>
      <Flex gap="2" h="xs">
        <TotalBalance
          flex="1"
          totalVolumeValue="156,039,746"
          dayVolumeValue="3,906,096"
        />
        <ChartCSPRPrice flex="1" />
      </Flex>
    </Box>
  );
};

export default AccountBalances;
