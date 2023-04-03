import { Box, BoxProps, Button, Flex, useClipboard } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import AccountTotalBalances from './AccountTotalBalances';
import TextLight from '@/components/Typography/TextLight';
import { PathEnum } from '@/enums';
import ChartCSPRPrice from '@/modules/core/ChartCSPRPrice';
import { publicKeySelector } from '@/store/wallet';

export type AccountBalancesProps = BoxProps;

const AccountBalances = (props: AccountBalancesProps) => {
  const { t } = useTranslation();
  const publicKey = useSelector(publicKeySelector);
  const { onCopy, setValue } = useClipboard(publicKey || '');

  const handleOnSwap = () => {
    setValue(publicKey || '');
    onCopy();
  };

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
          <Button variant="light" w="30" onClick={handleOnSwap}>
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
        <AccountTotalBalances />
        <ChartCSPRPrice flex="1" />
      </Flex>
    </Box>
  );
};

export default AccountBalances;
