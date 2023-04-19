import { Box, BoxProps, Flex, Heading, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { useAccount } from '@/hooks/useAccount';
import ButtonConnectWallet from '@/modules/core/ButtonConnectWallet';

export type AccountInfoProps = BoxProps;

const AccountInfo = (props: AccountInfoProps) => {
  const { t } = useTranslation();
  const { publicKey } = useAccount();
  return (
    <Box
      {...props}
      p="8"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="5xl"
      backgroundColor="white"
    >
      <Flex alignItems="center" justifyContent="space-between" gap="4">
        <Box flex={'1 0 100px'}>
          <Heading as="h3" size={{ base: 'sm', md: 'xl' }}>
            {t('account_info')}
          </Heading>
        </Box>
        {publicKey && <Text noOfLines={3}>{publicKey}</Text>}
        <ButtonConnectWallet display={{ base: 'flex', md: 'none' }} />
      </Flex>
    </Box>
  );
};

export default AccountInfo;
