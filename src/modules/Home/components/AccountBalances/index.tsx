import { Box, BoxProps, Button, Flex } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import AccountTotalBalances from './AccountTotalBalances';
import { PathEnum } from '@/enums';
import { useAccount } from '@/hooks/useAccount';
import ButtonViewReceivingAddress from '@/modules/core/ButtonViewReceivingAddress';
import ChartCSPRPrice from '@/modules/core/ChartCSPRPrice';

export type AccountBalancesProps = BoxProps;

const AccountBalances = (props: AccountBalancesProps) => {
  const { t } = useTranslation();
  const { isConnected } = useAccount();
  const isDisabled = !isConnected;

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
            <Button
              isDisabled={isDisabled}
              variant="light"
              w="30"
              color={'primary'}
            >
              {t('send')}
            </Button>
          </Link>
          <Link to={PathEnum.STAKING}>
            <Button
              isDisabled={isDisabled}
              variant="light"
              w="30"
              color={'primary'}
            >
              {t('staking')}
            </Button>
          </Link>
          <Link to={PathEnum.NFT}>
            <Button
              isDisabled={isDisabled}
              variant="light"
              w="30"
              color={'primary'}
            >
              {t('my_nfts')}
            </Button>
          </Link>
          <ButtonViewReceivingAddress
            variant="light"
            w="30"
            isDisabled={isDisabled}
            color={'primary'}
          />
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
