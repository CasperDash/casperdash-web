import { Box, BoxProps, Flex, Heading } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import ButtonConnectWallet from '@/modules/core/ButtonConnectWallet';

export type AccountInfoProps = BoxProps;

const AccountInfo = (props: AccountInfoProps) => {
  const { t } = useTranslation();
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
        <Box>
          <Heading as="h3" size={{ base: 'sm', md: 'xl' }}>
            {t('account_info')}
          </Heading>
        </Box>
        <Box>
          <ButtonConnectWallet />
        </Box>
      </Flex>
    </Box>
  );
};

export default AccountInfo;
