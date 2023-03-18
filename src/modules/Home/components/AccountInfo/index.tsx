import { Box, BoxProps, Flex } from '@chakra-ui/react';

import ButtonConnectWallet from '@/modules/core/ButtonConnectWallet';

export type AccountInfoProps = BoxProps;

const AccountInfo = (props: AccountInfoProps) => {
  return (
    <Box
      {...props}
      p="8"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="5xl"
      backgroundColor="white"
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Box>Account Info</Box>
        <Box>
          <ButtonConnectWallet />
        </Box>
      </Flex>
    </Box>
  );
};

export default AccountInfo;
