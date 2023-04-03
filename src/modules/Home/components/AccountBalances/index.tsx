import { Box, BoxProps, Button, Flex } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import AccountTotalBalances from './AccountTotalBalances';
import TextLight from '@/components/Typography/TextLight';
import { PathEnum } from '@/enums';
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
          <Link to={PathEnum.SEND}>
            <Button variant="light" w="30">
              {t('send')}
            </Button>
          </Link>
          <Button isDisabled={true} variant="light" w="30">
            {t('swap')}
          </Button>
          <Button isDisabled={true} variant="light" w="30">
            {t('staking')}
          </Button>
          <Button isDisabled={true} variant="light" w="30">
            {t('receive')}
          </Button>
        </Flex>
      </Flex>
      <Flex gap="2" h="xs">
        <AccountTotalBalances />
        <ChartCSPRPrice flex="1" />
      </Flex>
    </Box>
  );
};

export default AccountBalances;
