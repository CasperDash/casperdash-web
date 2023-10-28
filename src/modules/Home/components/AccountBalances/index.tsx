import { Box, BoxProps, Flex } from '@chakra-ui/react';

import AccountTotalBalances from './AccountTotalBalances';
import ChartCSPRPrice from '@/modules/core/ChartCSPRPrice';

export type AccountBalancesProps = BoxProps;

const AccountBalances = (props: AccountBalancesProps) => {
  return (
    <Box {...props}>
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
