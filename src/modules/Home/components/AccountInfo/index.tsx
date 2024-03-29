import { CheckIcon, CopyIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  BoxProps,
  Flex,
  Text,
  useClipboard,
  useDisclosure,
} from '@chakra-ui/react';

import MiddleTruncatedText from '@/components/Common/MiddleTruncatedText';
import { useGetCurrentAccount } from '@/hooks/queries/useGetCurrentAccount';
import { useAccount } from '@/hooks/useAccount';
import { ModalAccounts } from '@/modules/core/ModalAccounts';
import UnlockWalletPopupRequired from '@/modules/core/UnlockWalletPopupRequired';

export type AccountInfoProps = BoxProps;

const AccountName = () => {
  const { data: { name } = {} } = useGetCurrentAccount();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        alignItems={'center'}
        cursor="pointer"
        _hover={{
          color: 'secondary',
        }}
        onClick={onOpen}
      >
        <Text fontSize={{ base: 'xl', md: '2xl' }}>{name}</Text>
        <EditIcon ml="2" />
      </Flex>
      <UnlockWalletPopupRequired>
        <ModalAccounts isOpen={isOpen} onClose={onClose} />
      </UnlockWalletPopupRequired>
    </>
  );
};

const AccountInfo = (props: AccountInfoProps) => {
  const { publicKey = '' } = useAccount();
  const { onCopy, hasCopied } = useClipboard(publicKey, {
    timeout: 2000,
  });

  if (!publicKey) {
    return null;
  }

  const handleOnCopy = () => {
    onCopy();
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
          <AccountName />
        </Box>
        <Flex alignItems={'center'}>
          <Text noOfLines={4} display={{ base: 'none', xl: 'block' }}>
            {publicKey}
          </Text>
          <Box display={{ base: 'block', xl: 'none' }}>
            <MiddleTruncatedText value={publicKey || ''} />
          </Box>
          {hasCopied ? (
            <CheckIcon ml="4" />
          ) : (
            <CopyIcon ml="4" onClick={handleOnCopy} cursor="pointer" />
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default AccountInfo;
