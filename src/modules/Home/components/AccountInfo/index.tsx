import {
  Box,
  BoxProps,
  Flex,
  Heading,
  Text,
  useClipboard,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { useAccount } from '@/hooks/useAccount';
import { useI18nToast } from '@/hooks/useI18nToast';

export type AccountInfoProps = BoxProps;

const AccountInfo = (props: AccountInfoProps) => {
  const { t } = useTranslation();
  const { publicKey = '' } = useAccount();
  const { toastSuccess } = useI18nToast();
  const { onCopy } = useClipboard(publicKey);

  const handleOnCopy = () => {
    onCopy();
    toastSuccess('copy_public_key');
  };

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

        {publicKey && (
          <Text noOfLines={3} onClick={handleOnCopy}>
            {publicKey}
          </Text>
        )}
      </Flex>
    </Box>
  );
};

export default AccountInfo;
