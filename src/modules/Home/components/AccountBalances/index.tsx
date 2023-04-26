import { Box, BoxProps, Button, Flex } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import AccountTotalBalances from './AccountTotalBalances';
import { PathEnum } from '@/enums';
import { useGetCurrentAccount } from '@/hooks/queries/useGetCurrentAccount';
import ChartCSPRPrice from '@/modules/core/ChartCSPRPrice';

export type AccountBalancesProps = BoxProps;

const AccountBalances = (props: AccountBalancesProps) => {
  const { t } = useTranslation();
  const { data: { publicKey } = {} } = useGetCurrentAccount();
  const isDisabled = !publicKey;

  return (
    <Box {...props}>
      <Flex mb="2" alignItems="center" justifyContent="space-between">
        <Box ml="8"></Box>
        <Flex
          gap="2"
          display={{
            base: 'none',
            md: 'flex',
          }}
        >
          <Link to={PathEnum.SEND}>
            <Button isDisabled={isDisabled} variant="light" w="30">
              {t('send')}
            </Button>
          </Link>
          <Button isDisabled={true} variant="light" w="30">
            {t('staking')}
          </Button>
          <Link to={PathEnum.NFT}>
            <Button isDisabled={isDisabled} variant="light" w="30">
              {t('NFTs')}
            </Button>
          </Link>
          <Button isDisabled={true} variant="light" w="30">
            {t('receive')}
          </Button>
        </Flex>
      </Flex>
      <Flex
        direction={{
          base: 'column',
          xl: 'row',
        }}
        gap="2"
      >
        <AccountTotalBalances />
        <ChartCSPRPrice flex="1" />
      </Flex>
    </Box>
  );
};

export default AccountBalances;
