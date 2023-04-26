import {
  Box,
  BoxProps,
  Flex,
  Heading,
  Text,
  useClipboard,
} from '@chakra-ui/react';

import { useI18nToast } from '@/hooks/helpers/useI18nToast';
import { useGetCurrentAccount } from '@/hooks/queries/useGetCurrentAccount';

export type AccountInfoProps = BoxProps;

const AccountInfo = (props: AccountInfoProps) => {
  const { data: { publicKey, name } = {} } = useGetCurrentAccount();
  const { toastSuccess } = useI18nToast();
  const { onCopy } = useClipboard(publicKey || '');

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
          <Heading as="h4" size={{ base: 'sm', md: 'xl' }}>
            {name}
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
